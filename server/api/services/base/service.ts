import { ObjectId } from 'mongodb';
import { IService } from './iservice';

export class Service implements IService {

  constructor(public connection, public collection: string) { }

  public getAll = () => {
    return new Promise((resolve, reject) => {
      this.connection().then(
        (connection) => {
          const collection = connection.collection(this.collection);
          collection.find().toArray((error, result) => {
            connection.close();
            if (!error) {
              return resolve(result);
            } else {
              return reject(error);
            }
          });
        }
      );
    });

  };

  public getOne = (id: string) => {
  };

  public getSearch = (data: any) => { };

  public create = (data: any) => { };

  public update = (id: string) => { };

  public delete = (id: string) => { };
}
