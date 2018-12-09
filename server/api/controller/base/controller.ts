import { ObjectId } from 'mongodb';
import { IController } from "./icontroller";
import { Request, Response } from 'express';
import { Service } from "api/services/base/service";

export class Controller implements IController {
    constructor(
        private service: Service
    ) {

    }

    public getAll = (req: Request, res: Response) => {
        this.service.getAll().then((result) => res.json(result)).catch(e => res.status(400).json(e))
    }

    public getOne = (req: Request, res: Response) => {
        this.service.getOne(req.params.id).then((result) => res.json(result)).catch(e => res.status(400).json(e))

    }

    public getSearch = (req: Request, res: Response) => {
        console.log(req.query)
        this.service.getSearch(req.query).then((result) => res.json(result)).catch(e => res.status(400).json(e))

    }

    public create = (req: Request, res: Response) => {
        this.service.create(req.body).then((result) => res.status(201).json(result)).catch(e => res.status(400).json(e))
    }

    public update = (req: Request, res: Response) => {
        if (!this.isValidId(req.params.id)) {
            res.status(400).json(null)
        } else {
            this.service.update(req.params.id, req.body).then(() => res.status(204).json()).catch(e => res.status(400).json(e))
        }

    }

    public delete = (req: Request, res: Response) => {
        this.service.delete(req.params.id).then(() => res.status(204).json()).catch(e => res.status(400).json(e))
    }

    isValidId = (id) => {
        return ObjectId.isValid(id);
    }


}