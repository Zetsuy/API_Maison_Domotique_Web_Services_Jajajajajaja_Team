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

const myEmitter = new Mailer();


/* It's listening for the event to be emitted. */
myEmitter.on('event', (mail, statut, message) => {

    myEmitter.sendStatus(mail, statut, message)


});

/* It's emitting the event.
</code> */
myEmitter.emit('event' , 'test@test.com', 'Ceci est un sujet LOL', 'et un message cordialement.');

export default Mailer