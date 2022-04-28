import {IMailer}  from "../interfaces/IMailer";
import { EventEmitter } from "stream";
import nodemailer from 'nodemailer';
class Mailer extends EventEmitter implements IMailer {

    constructor() {
        super()
        
    }

    transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        auth: {
            user: 'project.1',
            pass: 'secret.1'
        }
    });

    sendStatus (mail : string, statut : string, message : string)  {

        let info = this.transporter.sendMail({
            from: '"Jeremy" <test@test.com>', // sender address
            to: mail, // list of receivers
            subject: statut, // Subject line
            text: message, // plain text body
            //html: "<b>Hello world?</b>", // html body
          });
               
        }

}

const mailer = new Mailer();

mailer.sendStatus("ceciestuntest@test.com","Code 500","Erreur");

export default Mailer