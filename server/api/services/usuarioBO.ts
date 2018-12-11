import { Service } from './base/service';
import { UsuarioModel } from '../models/usuario.model';
import { dbConnection } from '../../config/dbConnection';

export class UsuarioBO extends Service{
    constructor(app) {
        super(dbConnection(), new UsuarioModel().env);
    }
}