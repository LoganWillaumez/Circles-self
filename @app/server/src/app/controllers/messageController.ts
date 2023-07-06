import {Request, Response} from 'express';
import sanitizeHtml from 'sanitize-html';
import messageDatamapper from '../datamapper/messageDatamapper';
import AppError from '../../utils/AppError';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import { ErrorCode } from '@circles-self/circles/interfaces';

interface MessageDatas {
  id?: number;
  content: string;
  id_circle: number;
  id_customer: number;
}

const messageController = {
  async createMessage(req: Request, res: Response) {
    try{
      const {user} = req;
      const {id} = req.params;
      const {content} = req.body;
      
      const messageData: MessageDatas = {
        content: sanitizeHtml(content),
        id_circle: +sanitizeHtml(id),
        id_customer: +sanitizeHtml(user.customer_id)
      };
      
      const message = await messageDatamapper.createMessage(messageData);
  
      if (!message) {
        throw new AppError(ErrorCode.MESSAGE, 'message.cantCreated', 400);
      }
      
      res.status(201).json({message: 'Message successfully created!'});
    } catch (err: any) {
      throw new AppError(ErrorCode.MESSAGE, 'message.cantCreated', 400, err.stack);
    }
  }
};

export default wrapMethodsInTryCatch(messageController);
