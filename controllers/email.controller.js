const nodemailer = require('nodemailer');
require('../config/config.js');


function sendemail(receiver, htmlTag) {
    const sender = process.env.USER;
    const subject = 'Sigen.LK';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
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