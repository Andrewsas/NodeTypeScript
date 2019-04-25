import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { config } from "../../config/config";

export class SendEmail {

    constructor(
        public to: string[],
        public subject?: string,
        public pathOrMessage?: string,
        public tpTemplate?: boolean,
        public obj?: any) { }

    private configMail(): Promise<any> {
        return new Promise<any>((result, reject) => {
            const mailOptions = {
                from: config.email.email,
                to: this.to,
                subject: this.subject,
                html: this.pathOrMessage
            };

            if (this.tpTemplate) {
                this.getTemplate().then((data: string) => {
                    mailOptions.html = data;
                    result(mailOptions);
                }).catch(() => reject());
            } else {
                result(mailOptions);
            }
        });
    }

    public sendMail() {
        this.configMail().then(
            (mailOptions: any) => {
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
        ).catch(() => console.log('Falha ao configura email'));
    }

    private getTemplate(): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            fs.readFile(`./server/api/util/templates/${this.pathOrMessage}`, {encoding: 'utf-8'}, (erro, html) => {
                if (erro) {
                    console.log('Template not found');
                    reject();
                } else {
                    const template: string = handlebars.compile(html)(this.obj);
                    resolve(template);
                }
            });
        });

    }
}