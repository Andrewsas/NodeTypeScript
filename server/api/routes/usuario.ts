import { Application } from 'express';
import { Routes } from './base/routes'
import { UsuarioBO } from '../services/usuarioBO';
import { UsuarioModel } from '../models/usuario.model';

class UsuarioRoute extends Routes {
    
    constructor(app: Application) {
        super(app, new UsuarioModel().env, new UsuarioBO(app));        
    }
}

export default UsuarioRoute;