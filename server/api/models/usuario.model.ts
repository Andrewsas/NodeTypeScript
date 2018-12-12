import { BaseModel } from "./base/base.model";
import {IsInt, Length, Min, Max, IsString, MinLength} from "class-validator";
// import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";

export class UsuarioModel extends BaseModel {
    @MinLength(10)
    @IsString()
    nome: string;
    
    @IsInt()
    @Min(0)
    @Max(100)
    idade: number;

    @IsString()
    @MinLength(6)
    senha: string;
    
    get env () {
        return 'usuario';
    }

}
