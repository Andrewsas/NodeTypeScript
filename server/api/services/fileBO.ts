import { ObjectId } from 'mongodb';
import { FileModel } from '../models/file.model';
import { dbConnection } from '../../config/dbConnection';

export class FileBO {

    private connection: any;
    private collection: string = new FileModel().env;

    constructor(app) {
        this.connection = dbConnection();        
    }

    public getFile = (id: string) => {
        return new Promise((resolve, reject) => {
          this.connection().then(connection => {
            const collection = connection.collection(this.collection);
            collection.find(new ObjectId(id)).toArray((error, result) => {
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
    
    public setFile = (data: any) => {
        return new Promise((resolve, reject) => {
            this.connection().then(connection => {
            const collection = connection.collection(this.collection);
            collection.insert(data, (error, result) => {
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
