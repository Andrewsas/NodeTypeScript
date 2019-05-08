import * as jwt from 'jsonwebtoken';
import * as status from 'http-status';
import { validate } from 'class-validator';
import { config } from '../../config/config';

import { AccountBO } from '../services/accountBO';
import { UsuarioModel } from '../models/usuario.model';
import { AccountModel } from '../models/account.model';
import { Application, Request, Response } from 'express';

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
              const token = jwt.sign({ data: user }, config.secret, {expiresIn: config.expireToekn});
              res.setHeader('Authorization', token);
              res.status(status.OK).json(new UsuarioModel(result[0]));
            } else {
              res.status(status.BAD_REQUEST).send('login.notfound');
            }
          })
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      })
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public recoverySenha(req: Request, res: Response) {
    res.status(status.NO_CONTENT).json({msg: 'Recovery'});
    this.service.recoverySenha();
  }

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
