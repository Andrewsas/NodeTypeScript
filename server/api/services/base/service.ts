import { ObjectId } from 'mongodb';
import { IService } from './iservice';
// import { DB } from '../../../config/db';
import DbClient = require('../../../config/db');

export class Service implements IService {

  constructor(public collection: String) {}

  public getAll = async (resolve, reject) => {
    // return new Promise((resolve, reject) => {
        let connection = await DbClient.connect();
      
        const collection = await connection.collection(this.collection);
        
        collection.find().toArray((error, result) => {
          if (!error) {
            return resolve(result);
          } else {
            return reject(result);
          }
          connection.close();
        });
    // });
  };

  public getOne = (id: string) => {
    // return new Promise((resolve, reject) => {
    //   this.connectionDB.connectToMongo((client, db) => {
    //     const collection = db.collection(this.collection);
    //     collection.find(ObjectId(id)).toArray(function(error, result) {
    //       if (!error) {
    //         return resolve(result);
    //       } else {
    //         return reject(result);
    //       }
    //     });
    //     client.close();
    //   });
    // });
  };

  public getSearch = (data: any) => {};

  public create = (data: any) => {};

  public update = (id: string) => {};

  public delete = (id: string) => {};
}
