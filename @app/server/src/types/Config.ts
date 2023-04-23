export interface Config {
  db: {
    host: string;
    user: string;
    port: number;
    password: string;
    database: string;
  };
  token: {
    accessTokenLife: number;
    refresnTokenLife: number;
  }
}
