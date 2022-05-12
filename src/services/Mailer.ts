import { IMailer } from "../interfaces/IMailer";
import { EventEmitter } from "stream";
import nodemailer from 'nodemailer';
class Mailer extends EventEmitter implements IMailer {

    /* Creating a transporter object that will be used to send the email. */
    private transporter: nodemailer.Transporter;;

    /**
     * The constructor function takes an EventEmitter as a parameter and then uses the on() method to
     * listen for the "new-mail" event. When the event is emitted, the callback function is executed.
     * The callback function uses the sendMail() method to send the email.
     * </code>
     * @param {EventEmitter} emitter - EventEmitter
     */
    constructor(emitter: EventEmitter) {
        super()
        emitter.on("new-mail", (e: { mail: string, statut: string, message: string }) => {
            this.sendMail(e.mail, e.statut, e.message)
        })


        this.transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            auth: {
                user: 'project.1',
                pass: 'secret.1'
            }
        });
    }

    /**
     * It sends an email to the user with the status of the request
     * @param {string} mail - the email address of the recipient
     * @param {string} statut - the subject of the email
     * @param {string} message - The message you want to send.
     */
    sendMail(mail: string, statut: string, message: string) {

        let info = this.transporter.sendMail({
            from: '"Jeremy" <test@test.com>', // sender address
            to: mail, // list of receivers
            subject: statut, // Subject line
            text: message, // plain text body
            //html: "<b>Hello world?</b>", // html body
        });


    }

}


export default Mailer