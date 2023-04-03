import { Pool } from "pg";

export const testDbConnection = new Pool({
    host: 'localhost',
    port: 4102,
    user: 'postgres',
    password: 'postgres',
    database: 'circles',
    ssl: false,
  });