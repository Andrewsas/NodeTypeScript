import { PathParams } from 'express-serve-static-core';
import { verifyJWT } from '../../../api/util/verifyJWT';
import { Application, Request, Response } from 'express';
import { Controller } from 'api/controller/base/controller';


export class Routes {

    constructor(
        private app: Application,
        private path: PathParams,
        private controller: Controller<any>
    ) {
        this.getRoutes(this.app, this.path);
    }

    getRoutes(app: Application, path: PathParams): void {
        app.route(`/${path}`).get(verifyJWT, (req: Request, res: Response) => {
            this.controller.getAll(req, res)    
        });
        app.route(`/${path}/search`).get(verifyJWT, (req: Request, res: Response) => {
            this.controller.getSearch(req, res)    
        });
        app.route(`/${path}/:id`).get(verifyJWT, (req: Request, res: Response) => {
            this.controller.getOne(req, res)    
        });
        app.route(`/${path}`).post((req: Request, res: Response) => {
            this.controller.create(req, res)    
        });
        app.route(`/${path}/collection`).post(verifyJWT, (req: Request, res: Response) => {
            this.controller.createConllection(req, res)    
        });
        app.route(`/${path}/:id`).put(verifyJWT, (req: Request, res: Response) => {
            this.controller.update(req, res)    
        });
        app.route(`/${path}/:id`).delete(verifyJWT, (req: Request, res: Response) => {
            this.controller.delete(req, res)    
        });
    }
}


