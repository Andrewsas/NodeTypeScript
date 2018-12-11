import { Controller } from './base/controller';
import { UsuarioBO } from '../services/usuarioBO';
import { UsuarioModel } from '../models/usuario.model';

export class UsuarioControl extends Controller<UsuarioModel> {
  constructor(app) {
    super(new UsuarioBO(app), UsuarioModel);
  }
}
