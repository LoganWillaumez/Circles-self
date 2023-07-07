import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import jwbtoken from '../middlewares/jwtMiddleware';
import circlesControllers from '../controllers/circlesControllers';
import circleSchema from '../services/validation/circlesSchema';
import circlesMiddleware from '../middlewares/circlesMiddleware';

const circleRoutes = express.Router();

circleRoutes.use(jwbtoken.getAuthorization);

circleRoutes
  .get('/:circle_id', circlesControllers.getCircle)
  .post(
    '',
    validationMiddleware(circleSchema.createCircle()),
    circlesMiddleware(),
    circlesControllers.createCircle
  )
  .put(
    '/:circle_id',
    validationMiddleware(circleSchema.updateCircle()),
    circlesMiddleware(true),
    circlesControllers.updateCircle
  )
  .delete(
    '/:circle_id',
    validationMiddleware(circleSchema.deleteCircle()),
    circlesMiddleware(true),
    circlesControllers.deleteCircle
  )
  .post(
    '/invite/:circle_id',
    validationMiddleware(circleSchema.inviteCircle()),
    circlesMiddleware(),
    circlesControllers.inviteToCircle
  );

export default circleRoutes;
