import { Controller } from './base/controller';
import { AutorizacaoBO } from '../services/autorizacaoBO';
import { AutorizacaoModel } from '../models/autorizacao.model';

export class AutorizacaoControl extends Controller<AutorizacaoModel> {
  constructor(app, permiteAll?: Boolean) {
    super(new AutorizacaoBO(app), AutorizacaoModel);
  }
}
