// import 'dotenv/config';
import * as dotenv from "dotenv";
import 'express-async-errors';
dotenv.config({ path: __dirname+'/../../../.env' });
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import authRoutes from './app/routes/authRoutes';
import customerRoutes from './app/routes/customerRoutes';
import errorHandler from './app/middlewares/errorMiddleware';
import circleRoutes from './app/routes/circlesRoutes';
import eventRoutes from './app/routes/eventRoutes';
import {connectToDatabase} from './app/config/db.config';
import messageRoutes from "./app/routes/messageRoutes";

const PORT = process.env.SERVER_PORT || 3000;
const staticPath = path.join(__dirname, 'public');

const corsOptions = {
  origin: 'http://127.0.0.1:5173', // Change this to the URL of your client-side app
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

connectToDatabase();
const app = express();
app.use(express.static(staticPath));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/circles', circleRoutes);
app.use('/api/circles', eventRoutes);
app.use('/api/circles', messageRoutes);
app.use(errorHandler);

const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`connected to ${port}`);
  });

  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
      process.exit(1);
    } else {
      throw error;
    }
  });
};

if (require.main === module) {
  startServer(+PORT);
}

export default app;
