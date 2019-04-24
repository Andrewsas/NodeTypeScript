import * as nodemailer from "nodemailer";
import { config } from "../../config/config";

export class SendEmail {

    constructor(
        public to: string[],
        public subject?: string,
        public message?: string) { }

    public sendMail() {
        const mailOptions = {
            from: config.email.email,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        console.log(config.email);

        const transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: false,
            auth: config.email.auth,
            tls: { rejectUnauthorized: false }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return error;
            } else {
                console.log('E-mail enviado com sucesso!')
                return "E-mail enviado com sucesso!";
            }
        });
    }


}