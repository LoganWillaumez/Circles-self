import { Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import eventDatamapper from '../datamapper/eventDatamapper';
import { EventDatas } from '../../ts/interfaces/event.interface';

const eventController = {

  async getEvent(req: Request, res: Response) {
    const { idevent } = req.params;

    const event = await eventDatamapper.getEvent(idevent);

    res.status(200).json(event);
  },

  async createEvent(req: Request, res: Response) {
    const { user } = req;

    const { id } = req.params;

    const {
      // eslint-disable-next-line camelcase
      title, description, start, end, allday,
    } = req.body;

    const eventData = {
      title: sanitizeHtml(title),
      description: sanitizeHtml(description),
      end: sanitizeHtml(end),
      allday: sanitizeHtml(allday),
      start: sanitizeHtml(start),
      id_circle: sanitizeHtml(id),
      id_customer: sanitizeHtml(user.id),
    };

    const event = await eventDatamapper.createEvent(eventData);

    if (!event) {
      res.status(400);
      throw new Error('Circle cannot be created');
    }
    res.status(200).json({ message: 'successfully created !' });
  },

  async updateEvent(req: Request, res: Response) {
    const { idevent } = req.params;

    const {
      title, description, start, end, allday,
    } = req.body;

    const eventData: EventDatas = {
      title: sanitizeHtml(title),
      description: sanitizeHtml(description),
      start: new Date(sanitizeHtml(start)),
      end: new Date(sanitizeHtml(end)),
      allday: Boolean(sanitizeHtml(allday)),
    };

    const patchEvent = await eventDatamapper.updateEvent(idevent, eventData);

    if (patchEvent) {
      res.status(200).json({ message: 'Event successfully patch.', patchEvent });
    } else {
      res.status(400);
      throw new Error('Event can\'t be updated');
    }
  },

  async deleteEvent(req: Request, res: Response) {
    const { idevent } = req.params;

    await eventDatamapper.deleteEvent(idevent);

    const checkEventAfterDelete = await eventDatamapper.getEvent(idevent);

    if (!checkEventAfterDelete) {
      res.status(200).json({ message: 'Event successfully deleted.' });
    } else {
      res.status(400);
      throw new Error('Event can\'t be deleted');
    }
  },
};

export default eventController;
