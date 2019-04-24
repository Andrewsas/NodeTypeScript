import { SendEmail } from 'api/util/send';
import { UsuarioModel } from '../models/usuario.model';
import { Application } from 'express-serve-static-core';
import { dbConnection } from '../../config/dbConnection';

export class AccountBO {
  private collection: string = new UsuarioModel().env;
  private connection: any = dbConnection();
  private sendEmail: SendEmail;

  constructor(app: Application) {
    this.sendEmail = new SendEmail();
  }

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
    this.sendEmail.enviaEmail();
  }
}
