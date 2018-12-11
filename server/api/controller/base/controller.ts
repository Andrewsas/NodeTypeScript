import { ObjectId } from 'mongodb';
import * as status from 'http-status';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { IController } from './icontroller';
import { Service } from 'api/services/base/service';
import { BaseModel } from 'api/models/base/base.model';

export class Controller<TModel extends BaseModel> implements IController {
  constructor(private service: Service, public modelType: new () => TModel,) {}

  public getAll = (req: Request, res: Response) => {
    this.service
      .getAll()
      .then(result => res.status(status.OK).json(result))
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public getOne = (req: Request, res: Response) => {
    if (!this.isValidId(req.params.id)) {
      res.status(status.BAD_REQUEST).json();
    } else {
      this.service
        .getOne(req.params.id)
        .then(result => res.status(status.OK).json(result))
        .catch(e => res.status(status.BAD_REQUEST).json(e));
    }
  };

  public getSearch = (req: Request, res: Response) => {
    let data:TModel = Object.assign(new this.modelType(), req.query);
    // console.log(data)
    this.service
      .getSearch(data)
      .then(result => res.status(status.OK).json(result))
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public create = (req: Request, res: Response) => {
    const data:TModel = req.body;
    this.isValidBody(req, res)
      .then(() => {
        this.service
          .create(data)
          .then(result => res.status(status.CREATED).json(result))
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      })
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public update = (req: Request, res: Response) => {
    if (!this.isValidId(req.params.id)) {
      res.status(status.BAD_REQUEST).json();
    } else {
      this.service
        .update(req.params.id, req.body)
        .then(() => res.status(status.NO_CONTENT).json())
        .catch(e => res.status(status.BAD_REQUEST).json(e));
    }
  };

  public delete = (req: Request, res: Response) => {
    this.service
      .delete(req.params.id)
      .then(() => res.status(status.NO_CONTENT).json())
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public isValidId = id => {
    return ObjectId.isValid(id);
  };

  public isValidBody = (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      const data: TModel =  new this.modelType();
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
