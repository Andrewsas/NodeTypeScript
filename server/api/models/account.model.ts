import { BaseModel } from "./base/base.model";
import {IsInt, Length, Min, Max, IsString, MinLength} from "class-validator";

export class AccountModel extends BaseModel {
    @MinLength(10)
    @IsString()
    usename: string;

    @IsString()
    @MinLength(6)
    senha: string;
    
    get env () {
        return 'login';
    }

}
