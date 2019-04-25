import { SendEmail } from '../util/sendEmail';
import { UsuarioModel } from '../models/usuario.model';
import { Application } from 'express-serve-static-core';
import { dbConnection } from '../../config/dbConnection';

export class AccountBO {
  private collection: string = new UsuarioModel().env;
  private connection: any = dbConnection();
  
  constructor(app: Application) {  }

  public login = (data: any) => {
    return new Promise((resolve, reject) => {
      this.connection().then(connection => {
        const collection = connection.collection(this.collection);
        collection.find(data).toArray((error, result) => {
          if (!error) {
            return resolve(result);
          } else {
            return reject(error);
          }
        });
        connection.close();
      });
    });
  };

  public recoverySenha() {
    const email: any = new SendEmail(['s.andrew.santos@gmail.com'], 'Registro de Login', 'template.html', true )
    email.sendMail();
  }
}
