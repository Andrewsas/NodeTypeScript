import { Service } from './base/service';
import { AccountModel } from '../models/account.model';
import { dbConnection } from '../../config/dbConnection';

export class AccountBO {
    
    private collection: string = new AccountModel().env;
    private connection: any = dbConnection();  

    constructor (app) {}

    public login = (data: any) => {
        return new Promise((resolve, reject) => {
          this.connection().then(connection => {
            const collection = connection.collection(this.collection);
            collection.find(data).toArray((error, result) => {
                if (!error) {
                    return resolve(result);
                } else {
                    return reject(error);
                }
            });
            connection.close();
          });
        });
      };
}