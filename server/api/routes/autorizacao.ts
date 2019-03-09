import { Application } from 'express-serve-static-core';

import { Routes } from './base/routes'
import { AutorizacaoModel } from '../models/autorizacao.model';
import { AutorizacaoControl } from '../controller/autorizacao.control';

export class AutorizacaoRoute extends Routes {
    constructor(app: Application, permiteAll?: Boolean) {
        super(app, new AutorizacaoModel().env, new AutorizacaoControl(app), true);        
    }
}
