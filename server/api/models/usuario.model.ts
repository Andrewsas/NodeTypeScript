import { AccountModel } from "./account.model";

import {IsInt, Length, Min, Max, IsString, MinLength} from "class-validator";
// import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";

export class UsuarioModel extends AccountModel {
    @MinLength(10)
    @IsString()
    nome: string;
    
    @IsInt()
    @Min(0)
    @Max(100)
    idade: number;
    
    get env () {
        return 'usuario';
    }


    public constructor(user?: UsuarioModel, detalhes?: Boolean) {
        super(user);

        if (user) {
            this.nome = user.nome;
            this.idade = user.idade;
            this.username = user.username;
            
            if (detalhes) {
                this.autorizacao = user.autorizacao;
                this.password = user.password
            }
        }
    }

}
