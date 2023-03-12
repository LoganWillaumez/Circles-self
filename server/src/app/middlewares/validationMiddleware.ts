import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export,max-len
const validationMiddleware = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw error;
  } else {
    next();
  }
};

export default validationMiddleware;
