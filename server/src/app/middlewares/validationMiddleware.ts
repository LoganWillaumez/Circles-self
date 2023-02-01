import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export,max-len
const validationMiddleware = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(422);
    throw new Error(error.details[0].message);
  } else {
    next();
  }
};

export default validationMiddleware;
