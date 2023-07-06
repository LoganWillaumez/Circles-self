import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import jwbtoken from '../middlewares/jwtMiddleware';
import messageController from '../controllers/messageController';
import messageMiddleware from '../middlewares/messageMiddleware';
import messageSchema from '../services/validation/messageSchema';

const messageRoutes = express.Router();

messageRoutes.use(jwbtoken.getAuthorization);

messageRoutes
  .post(
    '/:id/message',
    validationMiddleware(messageSchema.createMessage()),
    messageMiddleware(),
    messageController.createMessage
  );

export default messageRoutes;
