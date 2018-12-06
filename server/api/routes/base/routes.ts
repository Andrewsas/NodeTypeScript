import { Service } from 'api/services/base/service';
import { PathParams } from 'express-serve-static-core';
import { Application, Request, Response } from 'express';

export class Routes {

    constructor(
        private app: Application, 
        private path: PathParams, 
        private service: Service
        ) {
        this.getRoutes(app, path);
    }

    getRoutes(app: Application, path: PathParams): void {
        app.route(`/${path}`).get((req: Request, res: Response) => this.service.getAll((result) => res.json(result), (error) => res.send('Erro')));
        // app.route(`/${path}/:id`).get((req: Request, res: Response) => this.service.getOne(req.params.id).then((result) => res.json(result), (error) => res.send('Erro')));
        app.route(`/${path}/search`).get((req: Request, res: Response) => res.send('Get One'));
        app.route(`/${path}`).post((req: Request, res: Response) => res.send('Create'));
        app.route(`/${path}/:id`).put((req: Request, res: Response) => res.send('Update'));
        app.route(`/${path}/:id`).delete((req: Request, res: Response) => res.send('Delete'));
    }
}
