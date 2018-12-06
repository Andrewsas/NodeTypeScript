import * as morgan from 'morgan';
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { errorHandlerApi } from './errorHandlerApi';

import Usuario from '../../routes/usuario';

class Api {

    public express: Application

    constructor() {
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        // this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.router(this.express);
    }

    private router(app: Application): void{
        new Usuario(app);
    }
}

export default new Api().express;