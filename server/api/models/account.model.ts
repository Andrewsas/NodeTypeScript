import { BaseModel } from "./base/base.model";
import {IsInt, Length, Min, Max, IsString, MinLength} from "class-validator";

export class AccountModel extends BaseModel {
    @MinLength(3)
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    autorizacao: any;
    
    get env () {
        return 'login';
    }

    public constructor(account?: AccountModel) {
        super(account)
    }
}
