import { Application } from 'express';
import { Routes } from './base/routes'
import { UsuarioBO } from '../services/usuarioBO';

class UsuarioRoute extends Routes {
    
    constructor(app: Application) {
        super(app, 'usuario', new UsuarioBO());
    }
}

export default UsuarioRoute;