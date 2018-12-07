import { Service } from './base/service';
import { dbConnection } from '../../config/dbConnection';

export class UsuarioBO extends Service {

    constructor(app) {
        super(dbConnection(), 'usuario');
    }

}