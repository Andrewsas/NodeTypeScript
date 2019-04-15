import { verifyJWT } from '../../api/util/verifyJWT';
import { Application, Request, Response } from 'express';

import { FileModel } from '../models/file.model';
import { FileControl } from '../controller/file.control';

export class FileRoute {

    private controller: FileControl; 
    private veirificaToken = verifyJWT;
    private path: string = new FileModel().env;

    constructor(app: Application, permiteAll?: Boolean) {
        if (permiteAll) {
            this.veirificaToken = (req, res, next) => { next() };
        } 
        
        this.controller = new FileControl(app);    
        this.getRoutes(app, this.path);    
    }

    getRoutes(app: Application, path: string): void {
        app.route(`/${path}`).post(this.veirificaToken, (req: Request, res: Response) => {
            console.log('aqui')
            this.controller.create(req, res)    
        });

        app.route(`/${path}/:id`).get(this.veirificaToken, (req: Request, res: Response) => {
            this.controller.getOne(req, res)    
        });
    }
}
