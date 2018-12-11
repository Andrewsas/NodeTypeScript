import { BaseModel } from "./base/base.model";
import {IsInt, Length, Min, Max} from "class-validator";
// import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";

export class UsuarioModel extends BaseModel {
    @Length(10, 50)
    nome: string;
    
    @IsInt()
    @Min(0)
    @Max(100)
    idade: number;
    
    get env () {
        return 'usuario';
    }

}
