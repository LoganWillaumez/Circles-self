import { Request, Response, NextFunction } from 'express';
import circlesDatamapper from '../datamapper/circlesDatamapper';
import eventDatamapper from '../datamapper/eventDatamapper';

const eventMiddleware = (admin = false, create = false) => async (err: any, req: Request, res: Response, next: NextFunction) => {
  const { user } = req;

  const { id, idevent } = req.params;

  const circle = await circlesDatamapper.getCircle(id);

  const event = await eventDatamapper.getEvent(idevent);

  if (!circle) {
    res.status(404);
    throw new Error('Circle dont exist');
  }

  if (!create && !event) {
    res.status(404);
    throw new Error('Event dont exist');
  }

  if (!create && !circle.events.find((event: any) => +event.id === +idevent)) {
    res.status(401);
    throw new Error('Event is not part of this circle');
  }

  if (admin && event.id_customer !== user.id) {
    res.status(403);
    throw new Error('You need to be the creator of the event to update it');
  }

  next();
};

export default eventMiddleware;
