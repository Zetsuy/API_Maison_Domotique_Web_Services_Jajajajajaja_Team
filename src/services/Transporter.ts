import nodemailer from 'nodemailer';


let transporter: nodemailer.Transporter;
let transporterEthereal: nodemailer.Transporter;
let transporterList: nodemailer.Transporter[];

transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: {
        user: 'project.1',
        pass: 'secret.1'
    }
});

//transporterList.push(transporter)

nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    //console.log('Credentials obtained, ready to send messages');

    transporterEthereal = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
    //console.log(transporterEthereal)
    transporterList = [transporter, transporterEthereal]
    //console.log(transporterList)
});

//transporterList.push(transporter)
//console.log("------------------------------------------------------------------------")

export {transporterList}