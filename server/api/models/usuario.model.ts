import { AccountModel } from "./account.model";

import {IsInt, Length, Min, Max, IsString, MinLength} from "class-validator";
import { AutorizacaoModel } from "./autorizacao.model";
// import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";

export class UsuarioModel extends AccountModel {
    @MinLength(10, {message: 'nome.length.small'})
    @IsString({message: 'nome.is.string'})
    nome: string;
    
    @IsInt({message: 'idade.is.int'})
    @Min(0, {message: 'idade.min'})
    @Max(100, {message: 'idade.max'})
    idade: number;
    
    get env () {
        return 'usuario';
    }


    public constructor(user?: UsuarioModel, detalhes?: Boolean) {
        super(user);
        if (user) {
            user.nome ? this.nome = user.nome : () => {};
            user.idade ? this.idade = user.idade : () => {};
            user.username ? this.username = user.username : () => {};

            if (detalhes) {
                user.autorizacao ? this.autorizacao = new AutorizacaoModel(user.autorizacao) : () => {};
                user.password ? this.password = user.password : () => {};
            }
        }
    }
}
