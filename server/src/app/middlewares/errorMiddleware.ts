import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
