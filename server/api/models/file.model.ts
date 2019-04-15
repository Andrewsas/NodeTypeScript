import { BaseModel } from "./base/base.model";

export class FileModel extends BaseModel {

    get env () {
        return 'files';
    }

    name: string;
    type: string;
    size: string;

    public constructor (file?: FileModel, detalhes?: Boolean) {
        super(file);
        if (file && detalhes) {
            file.name ? this.name = file.name : () => {};
            file.type ? this.type = file.type : () => {};
            file.size ? this.size = file.size : () => {};
        }
    }
}
