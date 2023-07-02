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
    const {id, idevent} = req.params;

    const circle = await circlesDatamapper.getCircle(+id);

    if (!circle) {
      throw new AppError(ErrorCode.EVENT, 'circle.notExist', 404);
    }

    if (!create) {
      const event = await eventDatamapper.getEvent(+idevent);
      
      if (!event) {
        throw new AppError(ErrorCode.EVENT, 'event.notExist', 404);
      }

      const checkEvent = circle.events.find((event: any) => +event.id === +idevent);
      
      if (!checkEvent) {
        throw new AppError(ErrorCode.EVENT, 'event.noPartOfCircle', 401);
      }

      if (admin && event.id_customer !== user.customer_id) {

        throw new AppError(ErrorCode.EVENT, 'event.noAdmin.noUpdate', 403);
      }
    }

    next();
  };


export default eventMiddleware;
