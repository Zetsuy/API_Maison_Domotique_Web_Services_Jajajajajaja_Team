import { NextFunction } from "express";

export interface IAuthentification {

    login: (token: string, id?: number) => Promise<boolean>,
    argon2Hash: (password: string) => any,
    argon2Verify: (userPassword: string, password: string) => any
}