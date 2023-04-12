import {Pool} from 'pg';
import config from '../../config';
import AppError from '../../utils/AppError';
import { ErrorCode } from '@circles-self/types';

const dbConnection = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  ssl: false
});

export const connectToDatabase = async () => {
  try {
    await dbConnection.connect();
  } catch (error) {
    throw new AppError(ErrorCode.DATABASE, 'databaseNoConnection', 500);
  }
};

export default dbConnection;
