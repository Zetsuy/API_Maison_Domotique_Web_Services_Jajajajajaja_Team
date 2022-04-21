import xss from 'xss';
import { NextFunction, Request, Response } from "express";
import { object } from 'zod';

// Middleware permettant de convertir les "string" afin d'eviter des injections
var xssScript = async function (req: Request, res: Response, next: NextFunction){

  try {
    for (const property in req.body){
      if (typeof property === 'string') {
        xss(req.body[property])
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
export default xssScript
