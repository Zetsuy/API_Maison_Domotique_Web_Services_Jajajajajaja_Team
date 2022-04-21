import xss from 'xss';
import { NextFunction, Request, Response } from "express";

// Middleware qui va traiter les injections xss
var xssScript = async function (req: Request, res: Response, next: NextFunction){

  try {
    for (const property in req.body){
      if (property == 'designation' || property == 'email' || property == 'password' || property == 'username'){
        req.body[property] = xss(req.body[property], {
          whiteList: {},
          stripIgnoreTag: true,
          stripIgnoreTagBody: ["script"]
        });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
export default xssScript
