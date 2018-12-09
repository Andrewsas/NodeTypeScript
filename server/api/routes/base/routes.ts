import { PathParams } from 'express-serve-static-core';
import { Application, Request, Response } from 'express';
import { Controller } from 'api/controller/base/controller';

export class Routes {

    constructor(
        private app: Application,
        private path: PathParams,
        private controller: Controller
    ) {
        this.getRoutes(this.app, this.path);
    }

    getRoutes(app: Application, path: PathParams): void {
        app.route(`/${path}`).get((req: Request, res: Response) => {
            this.controller.getAll(req, res)    
        });
        app.route(`/${path}/search`).get((req: Request, res: Response) => {
            this.controller.getSearch(req, res)    
        });
        app.route(`/${path}/:id`).get((req: Request, res: Response) => {
            this.controller.getOne(req, res)    
        });
        app.route(`/${path}`).post((req: Request, res: Response) => {
            this.controller.create(req, res)    
        });
        app.route(`/${path}/:id`).put((req: Request, res: Response) => {
            this.controller.update(req, res)    
        });
        app.route(`/${path}/:id`).delete((req: Request, res: Response) => {
            this.controller.delete(req, res)    
        });
    }
}


