import {Request, Response, NextFunction} from 'express';
import circlesDatamapper from '../datamapper/circlesDatamapper';
import circlesDataMapperInstance from '../datamapper/circlesDatamapper';
import AppError from '../../utils/AppError';
import { ErrorCode } from '@circles-self/types';

const circlesDataMapper = circlesDataMapperInstance.main;

const circlesMiddleware =
  (admin = false) =>
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    const {user} = req;
    const {id_circle} = req.params;

    const circle = await circlesDataMapper.getCircle(+id_circle);

    if (!circle) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.notExist', 404);

    }

    if (admin && circle.customer_admin !== user.id) {
      throw new AppError(ErrorCode.CIRCLE, 'circle.notExist', 403);
    }

    next();
  };

export default circlesMiddleware;
