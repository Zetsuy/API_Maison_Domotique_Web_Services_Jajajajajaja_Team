// Use at least Nodemailer v4.1.0
//const nodemailer = require('nodemailer');
import { IMailerEthereal } from '@/interfaces/IMailerEthereal';
import nodemailer from 'nodemailer';
import { EventEmitter } from "stream";


class MailerEthereal extends EventEmitter implements IMailerEthereal {

    /* Creating a transporter object that will be used to send the email. */
    private transporter!: nodemailer.Transporter;

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

        // Generate SMTP service account from ethereal.email
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            this.transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
        });
    }


    sendMail(mail: string, statut: string, text: string) {

        let message = ({
            from: '"Jeremy" <test@test.com>', // sender address
            to: mail, // list of receivers
            subject: statut, // Subject line
            text: text, // plain text body
            //html: "<b>Hello world?</b>", // html body
        });

        this.transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
}

export default MailerEthereal;