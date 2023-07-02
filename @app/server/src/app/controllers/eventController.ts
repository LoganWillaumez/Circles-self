import {Request, Response} from 'express';
import sanitizeHtml from 'sanitize-html';
import eventDatamapper from '../datamapper/eventDatamapper';
import AppError from '../../utils/AppError';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import { ErrorCode, EventDatas, EventInputDatas } from '@circles-self/circles/interfaces';

const eventController = {
  async getEvent(req: Request, res: Response) {
    const {id_event} = req.params;

    const event = await eventDatamapper.getEvent(+id_event);

    res.status(200).json(event);
  },

  async createEvent(req: Request, res: Response) {
    try{
      const {user} = req;
  
      const {id} = req.params;
  
      const {
        // eslint-disable-next-line camelcase
        title,
        description,
        start,
        end,
        allday
      } = req.body;
      
      const eventData: EventDatas = {
        title: sanitizeHtml(title),
        description: sanitizeHtml(description),
        end: end ? new Date(sanitizeHtml(end)) : null,
        allday: allday ? !sanitizeHtml(allday) : false,
        start: new Date(sanitizeHtml(start)),
        id_circle: +sanitizeHtml(id),
        id_customer: +sanitizeHtml(user.customer_id)
      };
      
  
      const event = await eventDatamapper.createEvent(eventData);
  
      if (!event) {
        throw new AppError(ErrorCode.EVENT, 'event.cantCreated', 400);
      }
      res.status(201).json({message: 'successfully created !'});
    } catch (err: any) {
      throw new AppError(ErrorCode.EVENT, 'event.cantCreated', 400, err.stack);
    }
  },

  async updateEvent(req: Request, res: Response) {
    try{
      const {idevent} = req.params;
  
      const {title, description, start, end, allday} = req.body;
  
      const eventData: EventInputDatas = {
        title: sanitizeHtml(title),
        description: sanitizeHtml(description),
        start: new Date(sanitizeHtml(start)),
        end: new Date(sanitizeHtml(end)),
        allday: allday ? !sanitizeHtml(allday) : false
      };
  
      const patchEvent = await eventDatamapper.updateEvent(+idevent, eventData);
  
      if (patchEvent) {
        res.status(200).json({message: 'Event successfully patch.', patchEvent});
      } else {
        throw new AppError(ErrorCode.EVENT, 'event.cantUpdated', 400);
      }
    } catch(err: any) {
      throw new AppError(ErrorCode.EVENT, 'event.cantUpdated', 400, err.stack);
    }
  },

  async deleteEvent(req: Request, res: Response) {
    const {idevent} = req.params;

    await eventDatamapper.deleteEvent(+idevent);

    const checkEventAfterDelete = await eventDatamapper.getEvent(+idevent);

    if (!checkEventAfterDelete) {
      res.status(200).json({message: 'Event successfully deleted.'});
    } else {
      throw new AppError(ErrorCode.EVENT, 'event.cantDeleted', 400);
    }
  }
};

export default wrapMethodsInTryCatch(eventController);
