import * as morgan from 'morgan';
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import multipart = require('connect-multiparty');

import Routes from '../api/routes/routes.intance';

import { interceptor } from '../api/util/interceptor';
import { errorHandlerApi } from '../api/util/errorHandlerApi';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }
    
    middleware(): void {
        this.express.use("/public", express.static(__dirname + '/../public'));
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(multipart());
        // this.express.use(cookieParser(config.secret))
        // this.express.use(csrf({ cookie: true }))
        this.express.use(interceptor);
        this.router(this.express);
    }

    private router(app: Application): void{
        new Routes(app);
    }
}

export default new Api().express;