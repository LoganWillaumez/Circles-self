import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import jwbtoken from '../middlewares/jwtMiddleware';
import eventSchema from '../services/validation/eventSchema';
import eventController from '../controllers/eventController';
import eventMiddleware from '../middlewares/eventMiddleware';

const eventRoutes = express.Router();

eventRoutes.use(jwbtoken.getAuthorization);
// Controller User

eventRoutes
  .get('/:id/event/:idevent', eventController.getEvent)
  .post(
    '/:id/event',
    validationMiddleware(eventSchema.createEvent()),
    eventMiddleware(undefined, true),
    eventController.createEvent
  )
  .put(
    '/:id/event/:idevent',
    validationMiddleware(eventSchema.updateEvent()),
    eventMiddleware(true),
    eventController.updateEvent
  )
  .delete(
    '/:id/event/:idevent',
    eventMiddleware(true),
    eventController.deleteEvent
  );

export default eventRoutes;
