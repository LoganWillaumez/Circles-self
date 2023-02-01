import { Pool } from 'pg';

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

client.connect().then(() => {
  console.log('connection ok');
}).catch((error:any) => {
  console.error(error);
});

export default client;
