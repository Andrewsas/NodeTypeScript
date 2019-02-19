import { Application } from 'express';

import { AccountRoute } from './account';
import { UsuarioRoute } from './usuario';

class Routes {
    constructor(app: Application) {
        new AccountRoute(app);
        new UsuarioRoute(app);
    }
}

export default Routes;
