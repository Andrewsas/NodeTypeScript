import { BaseModel } from "./base/base.model";
import {IsInt, Length, Min, Max, IsString, MinLength} from "class-validator";
import { AutorizacaoModel } from "./autorizacao.model";

export class AccountModel extends BaseModel {
    @MinLength(3, {message: 'username.length.small'})
    @IsString({message: 'username.is.string'})
    username: string;

    @IsString({message: 'password.is.string'})
    @MinLength(6, {message: 'password.length.small'})
    password: string;

    autorizacao: AutorizacaoModel;
    
    get env () {
        return 'login';
    }

}
