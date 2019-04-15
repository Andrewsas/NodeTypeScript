import * as fs  from 'fs';
import { ObjectId } from 'mongodb';
import * as status from 'http-status';
import { Request, Response } from 'express';


import { FileModel } from '../models/file.model';
import { FileBO } from '../services/fileBO';

export class FileControl {

  private service: any;
  public modelType: new (data?: FileModel, detalhe?: Boolean) => FileModel;

  constructor(app) {
    this.service = new FileBO(app);
  }

  public getOne = (req: Request, res: Response) => {
    if (!this.isValidId(req.params.id)) {
      res.status(status.BAD_REQUEST).json();
    } else {
      fs.readFile('./server/uploads/'+ req.params.id, (erro, content) => {
          if (erro){
              res.status(status.NOT_FOUND).json(erro);
              return;
          }
          res.writeHead(status.OK, {'content-type': 'imagem/jpg'});
          res.end(content);
      });
      // this.service
      //   .getFile(req.params.id)
      //   .then((result: FileModel[]) => res.status(status.OK).json(new this.modelType(result[0], true)))        
      //   .catch(e => res.status(status.BAD_REQUEST).json(e));
    }
  };

  public create = (req: any, res: Response) => {
    const data: FileModel = new FileModel();
          data._id = new ObjectId();
          data.dt_create = new Date;
          data.dt_update = new Date;

    const url_file = data._id;
    res.status(status.BAD_REQUEST).json(req.files)
    const path_orgin = req.files.path;
    const path_destino = './server/uploads/' + url_file;

    fs.rename(path_orgin, path_destino, (err) => {
      if(err){
        res.status(status.BAD_REQUEST).json();
        return;
      } else {
        this.service
          .setFile(data)
          .then((result: any)  => {
              res.status(status.CREATED).json(new this.modelType(result.ops[0], true))
          })
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      }
    });
  };

  public isValidId = id => {
    return ObjectId.isValid(id);
  };
}
