import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import jwbtoken from '../middlewares/jwtMiddleware';
import circlesControllers from '../controllers/circlesControllers';
import circleSchema from '../services/validation/circlesSchema';
import circlesMiddleware from '../middlewares/circlesMiddleware';

const circleRoutes = express.Router();

circleRoutes.use(jwbtoken.getAuthorization);

circleRoutes
  .get('/:circleId', circlesControllers.getCircle)
  .post('', validationMiddleware(circleSchema.createCircle()), circlesMiddleware(), circlesControllers.createCircle)
  .put('/:circleId', validationMiddleware(circleSchema.updateCircle()), circlesMiddleware(true), circlesControllers.updateCircle)
  .delete('/:circleId', validationMiddleware(circleSchema.deleteCircle()), circlesMiddleware(true), circlesControllers.deleteCircle);

export default circleRoutes;
