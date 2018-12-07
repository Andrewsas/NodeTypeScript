import { Service } from 'api/services/base/service';
import { PathParams } from 'express-serve-static-core';
import { Application, Request, Response } from 'express';

export class Routes {

    constructor(
        private app: Application, 
        private path: PathParams, 
        private service: Service
        ) {
        this.getRoutes(this.app, this.path);
    }

    getRoutes(app: Application, path: PathParams): void {
        app.route(`/${path}`).get((req: Request, res: Response) => this.service.getAll().then((result) => res.status(200).json(result)).catch(e => res.json(e)));
        app.route(`/${path}/search`).get((req: Request, res: Response) => this.service.getSearch(req.query).then((result) => res.status(200).json(result)).catch(e => res.json(e)));
        app.route(`/${path}/:id`).get((req: Request, res: Response) => this.service.getOne(req.params.id).then((result) => res.status(200).json(result)).catch(e => res.json(e)));
        app.route(`/${path}`).post((req: Request, res: Response) => this.service.create(req.body).then((result) => res.status(204).json()).catch(e => res.json(e)));
        app.route(`/${path}/:id`).put((req: Request, res: Response) => this.service.update(req.params.id, req.body).then((result) => res.status(201).json(result)).catch(e => res.json(e)));
        app.route(`/${path}/:id`).delete((req: Request, res: Response) => this.service.delete(req.params.id).then((result) => res.status(204).json()).catch(e => res.json(e)));
    }
}
