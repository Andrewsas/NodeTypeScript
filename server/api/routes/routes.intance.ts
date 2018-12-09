import { Application } from 'express';

import { UsuarioRoute } from './usuario';

class Routes {
    constructor(app: Application) {
        new UsuarioRoute(app);
    }
}

export default Routes;