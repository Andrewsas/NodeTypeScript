import { Service } from './base/service';
import { FileModel } from '../models/file.model';
import { dbConnection } from '../../config/dbConnection';

export class FileBO extends Service {
  constructor(app) {
      super(dbConnection(), new FileModel().env);
  }
}
