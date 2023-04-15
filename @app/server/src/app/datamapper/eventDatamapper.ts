import { EventDatas, EventInputDatas } from '@circles-self/circles/interfaces';
import client from '../config/db.config';

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
    const {title, description, start, end, allday, id_circle, id_customer} =
      data;
    const query = {
      text: 'INSERT INTO "event"("title", "description", "start", "end", "allday", "id_circle", "id_customer") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [title, description, start, end, allday, id_circle, id_customer]
    };
    const event = await client.query(query);
    return event ? event.rows[0] : false;
  },

  async updateEvent(id: number, data: EventInputDatas): Promise<EventDatas | false> {
    const fields = Object.keys(data).map(
      (prop, index) =>
        `"${prop}" = COALESCE(NULLIF($${index + 1}, ''), "${prop}")`
    );
    const values = Object.values(data);

    const updatedCircle = await client.query(
      `UPDATE "circle"
         SET ${fields}
         WHERE id = $${fields.length + 1}
         RETURNING *`,
      [...values, id]
    );
    return updatedCircle ? updatedCircle.rows[0] : false;
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
