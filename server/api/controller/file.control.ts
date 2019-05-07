import * as fs  from 'fs';
import { ObjectId } from 'mongodb';
import * as status from 'http-status';
import { Request, Response } from 'express';

import { FileBO } from '../services/fileBO';
import { config } from '../../config/config';
import { FileModel } from '../models/file.model';

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
      this.service
        .getOne(req.params.id)
        .then((result: FileModel[]) => {
          const file = new FileModel(result[0], true);
          fs.readFile(`./server/uploads/${file.path}`, (erro, content) => {
            if (erro){
                res.status(status.NOT_FOUND).json(erro);
            } else {
              res.writeHead(status.OK, { 'content-type': file.type });
              res.end(content);
            }
          });
        })        
        .catch(e => res.status(status.BAD_REQUEST).json(e));
    }
  };

  public create = (req: any, res: Response) => {
    const data: FileModel = new FileModel();
          data.dt_create = new Date;
          data.dt_update = new Date;

    const file: any = req.files.file;
          data.name = file.name;
          data.type = file.type;
          data.size = file.size;
          data.path =  `${new Date().getTime()}_${file.originalFilename}`;
    
    const path_orgin = file.path;
    const path_destino = `${config.pathUpload}${data.path}`;

    if (!fs.existsSync(config.pathUpload)) {
      fs.mkdir(config.pathUpload, (e) => {
        if(e) {
          console.log(e);
          res.status(status.BAD_REQUEST).json();
          return;
        }
      });
    }

    fs.rename(path_orgin, path_destino, (err) => {
      if(err){
        res.status(status.BAD_REQUEST).json();
        console.log(err);
      } else {
        this.service
          .create(data)
          .then((result: any) => res.status(status.OK).json(new FileModel(result.ops[0], true)))
          .catch(e => res.status(status.BAD_REQUEST).json(e));
      }
    });
  };

  public delete = (req: Request, res: Response) => {
    if (!this.isValidId(req.params.id)) {
      res.status(status.BAD_REQUEST).json();
    } else {
      this.service
      .getOne(req.params.id)
      .then((result: FileModel[]) => {
        const file = new FileModel(result[0], true);
        this.service.delete(req.params.id).then(() => {
          fs.stat(`./server/uploads/${file.path}`, (err, stats) => {
            if (err) {
                return console.error(err);
            } else {
              fs.unlink(`./server/uploads/${file.path}`,function(err){
                  if(err) return console.log(err);
                  else res.status(status.NO_CONTENT).json();
              });  
            }
          });
        })
        .catch(e => res.status(status.BAD_REQUEST).json(e));
      })        
      .catch(e => res.status(status.BAD_REQUEST).json(e));
    }
  };
  
  public isValidId = id => {
    return ObjectId.isValid(id);
  };
}
