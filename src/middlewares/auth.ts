import { NextFunction, Request, Response } from "express";
import { IAuthentification } from "@/interfaces/IAuthentification";
import Authentification from "@/services/Authentification";

// Middleware permettant la verification du Token
var tokenVerify = async function (req: Request, res: Response, next: NextFunction) {

    let tokenHeader = req.headers.authorization!.split(" ");
    let Auth : IAuthentification = new Authentification();

    try {
        Auth.login(tokenHeader[1]);
        next();
    } catch (error) {
        console.log(tokenHeader[1]);
        next(error);
    }
};

export default tokenVerify
