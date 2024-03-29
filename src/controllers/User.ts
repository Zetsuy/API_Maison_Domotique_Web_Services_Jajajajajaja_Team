import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import ApiResponse from "@/modules/Interface";
import jwt from "jsonwebtoken";
import config from "../config";
import Authentification from "@/services/Authentification";
import { IAuthentification } from "@/interfaces/IAuthentification";
import Emitter from "@/modules/Emitter";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {

    const users = UserModel.find((err: any, users: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Liste des utilisateurs :", users, undefined)
        res.send(resultat);
      }
    })
  },

  oneUser: async (req: Request, res: Response, next: NextFunction) => {

    const user = UserModel.findById(req.params.id, (err: any, user: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur :", user, undefined)
        res.send(resultat);
      }
    });
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = new UserModel(req.body);
    const oldUser = await UserModel.findOne({ email });
    // On fait une instance du service Authentification
    let Auth : IAuthentification = new Authentification();

    if (oldUser) {
      throw new Error("l'Utilisateur est déjà existant");
    }

    user.password = await Auth.argon2Hash(password);

    let token: string;
    try {
      token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    } catch (error) {
      throw new Error("jwt sign error");
    }

    user.save((err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
        Emitter.emit('new-mail', ({mail : "test@test.com", object : "Erreur Code : " + res.statusCode, message :  resultat.response + "  " + resultat.error}))
      } else {
        const resultat = new ApiResponse("created", {id :user.id}, undefined);
        res.send(resultat);
        Emitter.emit('new-mail', ({mail : "test@test.com", object :  "Code : " + res.statusCode + " :  Utilisateur créé !", message : "Un utilisateur s'est inscrit !"}))
      }
    });
  },

  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    let Auth : IAuthentification = new Authentification();

    if (!user) {
      throw new Error("Utilisateur non existant");
    }

    let token;
    try {
      token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    } catch (error) {
      throw new Error("jwt sign error");
    }

    try {
      if (await Auth.argon2Verify(user.password, password)) {
        const resultat = new ApiResponse("succes", { token: token }, undefined);
        res.send(resultat);
        Emitter.emit('new-mail', ({mail : "test@test.com", object :  "Code : " + res.statusCode + " : Utilisateur connecté !", message : "Un utilisateur s'est connecté !"}))
      } else {
        const resultat = new ApiResponse("Erreur :", undefined, password as Error)
        res.send(resultat);
        Emitter.emit('new-mail', ({mail : "test@test.com", object : "Erreur Code : " + res.statusCode, message :  resultat.response + "  " + resultat.error}))
      }
    } catch (error) {
      next(new Error("Erreur de verification"));
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {

    let user = UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, user: any) => {
        if (err) {
          const resultat = new ApiResponse("Erreur :", undefined, err as Error)
          res.send(resultat);
        } else {
          const resultat = new ApiResponse("Utilisateur mis à jour !", undefined)
          res.send(resultat);
        }
      }
    );
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {

    const user = UserModel.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur supprimé", undefined, undefined);
        res.send(resultat);
      }
    });
  },
}
