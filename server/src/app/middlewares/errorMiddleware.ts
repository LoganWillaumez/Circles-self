import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ErrorCode } from '../../ts/interfaces/errorCode';
import AppError from '../../utils/AppError';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response<unknown, Record<string, unknown>>,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  if (error instanceof Joi.ValidationError) {
    const { details } = error as Joi.ValidationError as { details: Joi.ValidationErrorItem[] };
    if (typeof details === 'object' && details !== null) {
      res.status(422).json({
        errorCode: ErrorCode.VALIDATION,
        message: details[0].message,
      });
      return;
    }
  }
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
    return;
  }

  res.status(500).send('Something went wrong');
};
export default errorHandler;
