// import {} from 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import authRoutes from './app/routes/authRoutes';
import customerRoutes from './app/routes/customerRoutes';
import errorHandler from './app/middlewares/errorMiddleware';
import circleRoutes from './app/routes/circlesRoutes';
import eventRoutes from './app/routes/eventRoutes';

const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, 'public');

const app = express();
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/circle', circleRoutes);
app.use('/api/circle', eventRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
