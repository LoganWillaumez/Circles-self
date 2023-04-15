import {Request, Response, NextFunction} from 'express';
import eventDatamapper from '../datamapper/eventDatamapper';
import circlesDataMapperInstance from '../datamapper/circlesDatamapper';
import AppError from '../../utils/AppError';
import { ErrorCode } from '@circles-self/circles/interfaces';

const circlesDatamapper = circlesDataMapperInstance.main;
const eventMiddleware =
  (admin = false, create = false) =>
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    const {user} = req;

    const {id_circle, id_event} = req.params;

    const circle = await circlesDatamapper.getCircle(+id_circle);

    const event = await eventDatamapper.getEvent(+id_event);

    if (!circle) {
      throw new AppError(ErrorCode.EVENT, 'circle.notExist', 404);
    }

    if (!create && !event) {
      throw new AppError(ErrorCode.EVENT, 'event.notExist', 404);
    }

    if (
      !create &&
      !circle.events.find((event: any) => +event.id === +id_event)
    ) {
      throw new AppError(ErrorCode.EVENT, 'event.noPartOfCircle', 401);
    }

    if(event){
      if (admin && event.id_customer !== user.id) {
      throw new AppError(ErrorCode.EVENT, 'event.noAdmin.noUpdate', 403);
    }
    } else {
      throw new AppError(ErrorCode.EVENT, 'event.error', 404);
    }

    next();
  };

export default eventMiddleware;
