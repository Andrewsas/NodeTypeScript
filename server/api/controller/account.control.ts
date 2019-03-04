import * as jwt from 'jsonwebtoken';
import * as status from 'http-status';
import { validate } from 'class-validator';
import { config } from '../../config/config';

import { AccountBO } from '../services/accountBO';
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
          .then((result: AccountModel) => {
            if (result) {
              const token = jwt.sign({ _id: result._id }, config.secret, {expiresIn: 60 * 60 * 24});
              res.setHeader('token', token);
              res.status(status.OK).json(result);
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
