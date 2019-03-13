import { BaseModel } from "./base/base.model";

import {IsString, MinLength} from "class-validator";

export class AutorizacaoModel extends BaseModel {
    @MinLength(3)
    @IsString()
    perfil: string;
    
    autorizacoes: PermissoesModel[];

    get env () {
        return 'autorizacao';
    }

    public constructor(auto?: AutorizacaoModel, detalhes?: Boolean) {
        super(auto);
        
        if(auto) {
            auto.perfil ? this.perfil = auto.perfil : () => {};
            auto.autorizacoes  ?this.autorizacoes = auto.autorizacoes  : () => {};
        }
    }

}

class PermissoesModel {
    @MinLength(3)
    @IsString()
    name: string;

    create: boolean;
    
    update: boolean;
    
    delete: boolean;
    
    read: boolean;    
}
