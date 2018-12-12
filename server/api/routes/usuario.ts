import { Routes } from './base/routes'
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioControl } from '../controller/usuario.control';

export class UsuarioRoute extends Routes {
    constructor(app) {
        super(app, new UsuarioModel().env, new UsuarioControl(app));        
    }
}
