import { AccountModel } from '../models/account.model';
import { AccountControl } from '../controller/account.control';
import { Application, Request, Response } from 'express';

export class AccountRoute {

    private controller: AccountControl; 
    private path: string = new AccountModel().env;

    constructor(app: Application) {
        this.controller = new AccountControl(app);    
        this.getRoutes(app, this.path);    
    }

    getRoutes(app: Application, path: string): void {
        app.route(`/${path}`).post((req: Request, res: Response) => {
            this.controller.login(req, res)    
        });
    }
}
