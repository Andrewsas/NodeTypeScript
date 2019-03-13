import { ObjectId } from 'mongodb';

export class BaseModel {
    public _id: ObjectId;
    public dt_create: Date;
    public dt_update: Date;
    public delete: Boolean;

    public constructor(data?: BaseModel) {
        if (data) {
            data._id ? this._id = <ObjectId> new ObjectId(data._id) : () => {};
            data.delete ? this.delete = data.delete : () => {};
            data.dt_create ? this.dt_create = data.dt_create : () => {};
            data.dt_update ? this.dt_update = data.dt_update : () => {};
        }
    }
}
