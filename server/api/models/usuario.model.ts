import { BaseModel } from "./base/base.model";

export class UsuarioModel extends BaseModel {
    public name: String;
    public idade: Number;
    
    get env () {
        return 'usuario';
    }

}
