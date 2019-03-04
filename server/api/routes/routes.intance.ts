import { Application } from 'express';

import { AccountRoute } from './account';
import { UsuarioRoute } from './usuario';
import { AutorizacaoRoute } from './autorizacao';

class Routes {

    private permiteAll: Boolean = false;

    constructor(app: Application) {
        new AccountRoute(app, this.permiteAll);
        new UsuarioRoute(app, this.permiteAll);
        new AutorizacaoRoute(app, this.permiteAll);
    }
}

export default Routes;
