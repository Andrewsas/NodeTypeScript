import { Request, Response } from 'express';

export interface IController {
    getAll(req: Request, res: Response);
    getOne(req: Request, res: Response);
    getSearch(req: Request, res: Response);
    create(req: Request, res: Response);
    update(req: Request, res: Response);
    delete(req: Request, res: Response);
}