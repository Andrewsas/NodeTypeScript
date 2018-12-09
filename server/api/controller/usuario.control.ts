import { Controller } from "./base/controller";
import { UsuarioBO } from "../services/usuarioBO";

export class UsuarioControl extends Controller {
    constructor(app) {
        super(new UsuarioBO(app))
    }
}