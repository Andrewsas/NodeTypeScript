import { Application, Request, Response } from 'express';

import { AccountModel } from '../models/account.model';
import { AccountControl } from '../controller/account.control';

export class AccountRoute {

    private controller: AccountControl; 
    private path: string = new AccountModel().env;

    constructor(app: Application, permiteAll?: Boolean) {
        this.controller = new AccountControl(app);    
        this.getRoutes(app, this.path);    
    }

    getRoutes(app: Application, path: string): void {
        app.route(`/${path}`).post((req: Request, res: Response) => {
            this.controller.login(req, res)    
        });

        app.route(`/recovery`).post((req: Request, res: Response) => {
            this.controller.recoverySenha(req, res)    
        });
    }
}
