import { ObjectId } from 'mongodb';
import * as status from 'http-status';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { IController } from './icontroller';
import { Service } from 'api/services/base/service';
import { BaseModel } from 'api/models/base/base.model';

export class Controller<TModel extends BaseModel> implements IController {
  constructor(private service: Service, public modelType: new (data?: TModel, detalhe?: Boolean) => TModel) {}

  public getAll = (req: Request, res: Response) => {
    this.service
      .getAll()
      .then((result: TModel[]) => res.status(status.OK).json(result.map(
        (item: TModel) => {
          return new this.modelType(item, false);
        }
      )))
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public getOne = (req: Request, res: Response) => {
    if (!this.isValidId(req.params.id)) {
      res.status(status.BAD_REQUEST).json();
    } else {
      this.service
        .getOne(req.params.id)
        .then((result: TModel[]) => res.status(status.OK).json(new this.modelType(result[0], true)))        
        .catch(e => res.status(status.BAD_REQUEST).json(e));
    }
  };

  public getSearch = (req: Request, res: Response) => {
    let data: TModel = Object.assign(new this.modelType(), req.query);
    this.service
      .getSearch(data)
      .then((result: TModel[]) => res.status(status.OK).json(result.map(
        (item: TModel) => {
          return new this.modelType(item, false);
        }
      ))) 
      .catch(e => res.status(status.BAD_REQUEST).json(e));
  };

  public create = (req: Request, res: Response) => {
    const data: TModel = new this.modelType(req.body, true);
          data.dt_create = new Date;
          data.dt_update = new Date;
    this.isValidBody(req, res)
      .then(() => {
        this.service
          .create(data)
          .then((result: any)  => res.status(status.CREATED).json(new this.modelType(result.ops[0], true)))
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      })
      .catch((e: any[]) => res.status(status.BAD_REQUEST).json(e[0]));
  };

  public createConllection = (req: Request, res: Response) => {
    const data: TModel[] = (<TModel[]>(req.body)).map(
      (item: TModel) => {
        item.dt_create = new Date;
        item.dt_update = new Date;
        return new this.modelType(item, true);
      }
    );
    this.isValidBodyArray(req, res)
      .then(() => {
        this.service
          .create(data)
          .then((result: any) => res.status(status.CREATED).json(result.ops.map(
            (item: TModel) => {
              return new this.modelType(item, true);
            }
          )))
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      })
      .catch((e: any[]) => res.status(status.BAD_REQUEST).json(e[0]));
  };

  public update = (req: Request, res: Response) => {
    if (!this.isValidId(req.params.id)) {
      res.status(status.BAD_REQUEST).json();
    } else {
      const data = this.updateParameter(req.body);
            data.dt_update = new Date;
      this.service
        .update(req.params.id, data)
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
      const data: TModel = new this.modelType();
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

  public isValidBodyArray = (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      const body: any[] = req.body;
      body.forEach((obj: TModel, index, array) => {
        const data: TModel = new this.modelType();
        Object.assign(data, obj);
        validate(data).then(errors => {
          if (errors.length > 0) {
            return reject(errors);
          } else if (index === array.length - 1) {
            return resolve();
          }
        });
      });
    });
  };

  private updateParameter(data: any): TModel {
    const newModel: TModel = new this.modelType(data, true);
    let params: TModel = new this.modelType(data, true);
    Object.keys(newModel).forEach((key) => {
      if (data[key]) {
         params[key] = data[key]; 
      } else {
        delete params[key];
      }
    });
    return params;
  }
}
