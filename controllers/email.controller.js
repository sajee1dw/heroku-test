const nodemailer = require('nodemailer');
require('../config/config.js');
const USER = "achiniupeksha87@gmail.com";
const PASSWORD = "Masd#1995";

function sendemail(receiver, htmlTag) {
    const sender = USER;
    const subject = 'Sigen.LK';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER,
            pass: PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        html: htmlTag
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('error');
            console.log(error);
            throw new Error('email sending failed');

        } else {
            res.status(200).json({
                state: true
            })
        }
    });
}



module.exports = {
    sendemail: sendemail
};