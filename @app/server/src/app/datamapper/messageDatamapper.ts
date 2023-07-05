import { ErrorCode } from '@circles-self/circles/interfaces';
import client from '../config/db.config';
import AppError from '../../utils/AppError';

interface MessageDatas {
  id?: number;
  content: string;
  id_circle: number;
  id_customer: number;
}

const messageDatamapper = {
  async createMessage(data: MessageDatas): Promise<MessageDatas | false> {
    try {
      const {content, id_circle, id_customer} = data;
      const fields = ['"content"', '"id_circle"', '"id_customer"'];
      const values = [content, id_circle, id_customer];

      const placeholders = values.map((_, i) => `$${i + 1}`).join(',');
      const query = {
        text: `INSERT INTO "message"(${fields.join(',')}) VALUES (${placeholders}) RETURNING *`,
        values: values
      };

      const message = await client.query(query);
      return message ? message.rows[0] : false;
    } catch (error: any) {
      throw new AppError(ErrorCode.DATABASE, 'message.cantCreated', 500, error.stack);
    }
  }
};

export default messageDatamapper;
