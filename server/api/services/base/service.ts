import { ObjectId } from 'mongodb';
import { IService } from './iservice';

export class Service implements IService {
  constructor(public connection, public collection: string) {}

  public getAll = () => {
    return new Promise((resolve, reject) => {
      this.connection().then(connection => {
        const collection = connection.collection(this.collection);
        collection.find().toArray((error, result) => {
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

  public getOne = (id: string) => {
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

  public getSearch = (data: any) => {
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

  public create = (data: any) => {
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

  public update = (id: string, data: any) => {
    return new Promise((resolve, reject) => {
      this.connection().then(connection => {
        const collection = connection.collection(this.collection);
        collection.update(
          { _id: new ObjectId(id) },
          { $set: data },
          {},
          (error, result) => {
            if (!error) {
              return resolve(result);
            } else {
              return reject(error);
            }
          }
        );
        connection.close();
      });
    });
  };

  public delete = (id: string) => {
    return new Promise((resolve, reject) => {
      this.connection().then(connection => {
        const collection = connection.collection(this.collection);
        collection.deleteOne({ _id: new ObjectId(id) }, (error, result) => {
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
