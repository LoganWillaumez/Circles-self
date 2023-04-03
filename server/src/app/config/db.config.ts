import { Pool } from 'pg';
import config from '../../config';
import { ErrorCode } from '../../ts/interfaces/errorCode';
import AppError from '../../utils/AppError';


const dbConnection = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  ssl: false,
});

export const connectToDatabase = async () => {
  try {
    await dbConnection.connect();
    console.log('Connection to the database successful');
  } catch (error) {
    throw new AppError(ErrorCode.DATABASE, 'databaseNoConnection', 500);
  }
};

export default dbConnection;
