const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const dotenv = require('dotenv');

dotenv.config();

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

const transporter = nodemailer.createTransport(mg(auth));

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'no-reply@creme-de-cake.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent successfully:', info);
        }
    });
};

module.exports = sendMail;

