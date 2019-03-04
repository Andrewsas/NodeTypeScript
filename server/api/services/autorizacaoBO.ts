import { Service } from './base/service';
import { dbConnection } from '../../config/dbConnection';
import { AutorizacaoModel } from '../models/autorizacao.model';

export class AutorizacaoBO extends Service{
    constructor(app) {
        super(dbConnection(), new AutorizacaoModel().env);
    }
}