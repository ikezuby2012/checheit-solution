const nodemailer = require('nodemailer');
const pug = require("pug");
const {htmlToText} = require("html-to-text");

module.exports = class Email {
    constructor(user) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        //this.url = url;
        this.from = `zubyPure <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        if (process.env.NODE_ENV === "production") {
            // sendgrid
            return nodemailer.createTransport({
                // i have issues with my sendgrid account for now so lets roll with gmail
                // service: "sendgrid",
                // auth: {
                //     user: process.env.SENDGRID_USERNAME,
                //     pass: process.env.SENDGRID_PASSWORD
                // }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
        });
    }

    async send(template, subject) {
        // send the actual email
        // render html based on a pug template
        const html = pug.renderFile(`${__dirname}\\..\\views\\${template}.pug`, {
            firstName: this.firstName,
            // url = this.url,
            subject
        });
        const text = htmlToText(html);

        //define email option   
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text
        };
        //create a transport and send it
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send("emailTemplate", "welcome to the cheche family!");
    }
};
