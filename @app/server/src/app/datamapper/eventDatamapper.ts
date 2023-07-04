import { ErrorCode, EventDatas, EventInputDatas } from '@circles-self/circles/interfaces';
import client from '../config/db.config';
import AppError from '../../utils/AppError';

const eventDatamapper = {
  async getEvent(id: number): Promise<EventDatas | false> {
    const query = {
      text: 'SELECT * FROM event WHERE "event".id = $1;',
      values: [id]
    };
    const event = await client.query(query);
    return event ? event.rows[0] : false;
  },

  async createEvent(data: EventDatas): Promise<EventDatas | false> {
    try {    
      const {title, description, start, end, allday, id_circle, id_customer} = data;

      const fields = ['"title"', '"description"', '"start"', '"allday"', '"id_circle"', '"id_customer"'];
      const values = [title, description, start, allday, id_circle, id_customer];

      if(end) {
        // include end in the query and values only if it exists
        fields.push('"end"');
        values.push(end);
      }

      // Dynamically create placeholders for query
      const placeholders = values.map((_, i) => `$${i + 1}`).join(',');
      const query = {
        text: `INSERT INTO "event"(${fields.join(',')}) VALUES (${placeholders}) RETURNING *`,
        values: values
      };

      const event = await client.query(query);
      return event ? event.rows[0] : false;
    } catch (error: any) {
      throw new AppError(ErrorCode.EVENT, 'event.cantCreated', 500, error.stack);
    }
},




async updateEvent(id: number, data: EventInputDatas): Promise<EventDatas | false> {
  try {
    const fields = Object.keys(data).map(
      (prop, index) =>
        `"${prop}" = $${index + 1}`
    );

    const values = Object.values(data).map(value => {
      if (value instanceof Date && isNaN(value.getTime())) {
        return null;
      } else {
        return value;
      }
    });


    const updatedEvent = await client.query(
      `UPDATE "event"
         SET ${fields.join(',')}
         WHERE id = $${fields.length + 1}
         RETURNING *`,
      [...values, id]
    );

    return updatedEvent ? updatedEvent.rows[0] : false;
  } catch (error: any) {
    throw new AppError(ErrorCode.DATABASE, 'error.updateEvent', 400, error.stack);
  }
},


  async deleteEvent(id: number) {
    const query = {
      text: 'DELETE FROM "event" WHERE "event".id = $1',
      values: [id]
    };
    return client.query(query);
  }
};

export default eventDatamapper;
