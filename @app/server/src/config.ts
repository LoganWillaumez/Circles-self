import {Config} from './types/Config';

const devConfig: Config = {
  db: {
    host: process.env.DEV_DB_HOST || '',
    user: process.env.DEV_DB_USER || '',
    port: +process.env.DEV_DB_PORT! || 5432,
    password: process.env.DEV_DB_PASSWORD || '',
    database: process.env.DEV_DB_NAME || ''
  }
};

const prodConfig: Config = {
  db: {
    host: process.env.PROD_DB_HOST || '',
    user: process.env.PROD_DB_USER || '',
    port: +process.env.PROD_DB_PORT! || 5432,
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || ''
  }
};

const config = process.env.ENV === 'prod' ? prodConfig : devConfig;

export default config;
