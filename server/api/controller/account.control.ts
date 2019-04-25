import * as jwt from 'jsonwebtoken';
import * as status from 'http-status';
import { validate } from 'class-validator';
import { config } from '../../config/config';

import { AccountBO } from '../services/accountBO';
import { UsuarioModel } from '../models/usuario.model';
import { AccountModel } from '../models/account.model';
import { Application, Request, Response } from 'express';
import { SendEmail } from '../../api/util/sendEmail';

export class AccountControl {
  
  private service: AccountBO;

  constructor(app: Application) { 
    this.service = new AccountBO(app);
  }

  public login (req: Request, res: Response) {
    const data: AccountModel = req.body;
    this.isValidBody(req, res)
      .then(() => {
        this.service
          .login(data)
          .then((result: UsuarioModel[]) => {
            if (result.length) {
              const user: any = {_id: result[0]._id, autorizacao: result[0].autorizacao};
              const token = jwt.sign({ data: user }, config.secret, {expiresIn: 60 * 60 * 24});
              res.setHeader('token', token);
              res.status(status.OK).json(new UsuarioModel(result[0]));
              const email: any = new SendEmail(['s.andrew.santos@gmail.com'], 'Registro de Login', 'template.html', true )
              email.sendMail();
            } else {
              res.status(status.BAD_REQUEST).send('login.notfound');
            }
          })
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      })
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public isValidBody = (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      const data: AccountModel = new AccountModel();
      Object.assign(data, req.body);
      validate(data).then(errors => {
        if (errors.length > 0) {
          return reject(errors);
        } else {
          return resolve();
        }
      });
    });
  };
}
