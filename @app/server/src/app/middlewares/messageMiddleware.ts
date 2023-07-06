import {Request, Response, NextFunction} from 'express';
import messageDatamapper from '../datamapper/messageDatamapper';
import circlesDataMapperInstance from '../datamapper/circlesDatamapper';
import AppError from '../../utils/AppError';
import { ErrorCode } from '@circles-self/circles/interfaces';
import customerDataMapperInstance from '../datamapper/customerDatamapper';

const circlesDatamapper = circlesDataMapperInstance.main;

const messageMiddleware = () =>
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {user} = req;

    const circle = await circlesDatamapper.getCircle(+id);
    const userCheck = await customerDataMapperInstance.main.getCustomerById(+user.customer_id);

    if(!userCheck) {
        throw new AppError(ErrorCode.MESSAGE, 'user.notExist', 404);
    }
    if (!circle) {
      throw new AppError(ErrorCode.MESSAGE, 'circle.notExist', 404);
    }


    next();
  };

export default messageMiddleware;
