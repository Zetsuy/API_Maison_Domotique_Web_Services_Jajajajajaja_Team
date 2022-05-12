import { IAuthentification } from "@/interfaces/IAuthentification";
import jwt from "jsonwebtoken";
import config from "../config";
import argon2 from "argon2";

class Authentification implements IAuthentification {

    constructor() {
    }

    // Permet la connexion en vérifiant le token en entrée
    public async login(token: string, id?: number) {

        if (jwt.verify(token, config.jwtSecret)) {
            return true;
        }
        return false;
    };

    // Permet de Hasher le mdp à la création de l'utilisateur
    public argon2Hash(password: string) {

        try {
            return argon2.hash(password);
        } catch {
            throw (new Error("argon2 error hash"));
        }
    }

    // Permet de vérifier le mdp à la connexion
    public argon2Verify(userPassword: string, password: string) {

        try {
            return argon2.verify(userPassword, password);
        } catch {
            throw new Error("argon2 error verify");
        }
    }
}

export default Authentification;