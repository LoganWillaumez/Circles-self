import client from '../config/db.config';

const eventDatamapper: any = {

  async getEvent(id: number) {
    const query = {
      text:
                'SELECT * FROM event WHERE "event".id = $1;',
      values: [id],
    };
    const event = await client.query(query);
    if (event) {
      return event.rows[0];
    }
    return false;
  },

  async createEvent(datas: any) {
    const {
      // eslint-disable-next-line camelcase
      title, description, start, end, allday, id_circle, id_customer,
    } = datas;
    // eslint-disable-next-line camelcase
    const query = { text: 'INSERT INTO "event"("title", "description", "start", "end", "allday", "id_circle", "id_customer") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', values: [title, description, start, end, allday, id_circle, id_customer] };
    const event = await client.query(query);
    if (event) {
      return event.rows[0];
    }
    return false;
  },

  async updateEvent(id: number, datas: any) {
    const fields = Object.keys(datas).map((prop, index) => `"${prop}" = COALESCE(NULLIF($${index + 1}, ''), "${prop}")`);
    const values = Object.values(datas);

    const updatedCircle = await client.query(
      `UPDATE "circle"
         SET ${fields}
         WHERE id = $${
  fields.length + 1
} RETURNING *`,
      [...values, id],
    );
    if (updatedCircle) {
      return updatedCircle.rows[0];
    }
    return false;
  },

  async deleteEvent(id: number) {
    const query = { text: 'DELETE FROM "event" WHERE "event".id  = $1', values: [id] };
    return client.query(query);
  },
};

export default eventDatamapper;
