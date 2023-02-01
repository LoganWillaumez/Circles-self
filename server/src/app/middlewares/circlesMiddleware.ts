import { Request, Response, NextFunction } from 'express';
import circlesDatamapper from '../datamapper/circlesDatamapper';

const circlesMiddleware = (admin = false) => async (err: any, req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  const { circleId } = req.params;

  const circle = await circlesDatamapper.getCircle(circleId);

  if (!circle) {
    res.status(404);
    throw new Error('Circle dont exist');
  }

  if (admin && circle.customer_admin !== user.id) {
    res.status(403);
    throw new Error('You need to be the admin of the circle.');
  }


  next();
};

export default circlesMiddleware;
