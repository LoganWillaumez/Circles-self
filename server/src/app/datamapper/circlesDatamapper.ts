import client from '../config/db.config';
import { CircleDatas } from '../../ts/interfaces/circle.interfaces';

const circlesDatamapper: any = {

  async getCircle(id: number) {
    const query = {
      text:
          'SELECT json_build_object('
          + '\'id\', cc.id, '
          + '\'name\', cc.name, '
          + '\'customer_admin\', cc.customer_admin,'
          + '\'description\', cc.description,'
          + '\'img\', cc.img,'
          + '\'created_at\', cc.created_at,'
          + '\'updated_at\', cc.updated_at,'
          + '\'messages\', jsonb_agg(m),'
          + '\'events\', jsonb_agg(e))'
          + 'FROM "circle" cc '
          + 'LEFT JOIN "event" e ON cc.id = e.id_circle '
          + 'LEFT JOIN "message" m ON cc.id = m.id_circle WHERE cc.id=$1 GROUP BY cc.id;',
      values: [id],
    };
    const circle = await client.query(query);
    if (circle) {
      return circle.rows[0]?.json_build_object;
    }
    return false;
  },

  async createCircle(id: number, datas: CircleDatas) {
    const {
      // eslint-disable-next-line camelcase
      name, description, img,
    } = datas;
    // eslint-disable-next-line camelcase
    const query1 = { text: 'INSERT INTO circle(name, customer_admin, description, img) VALUES ($1, $2, $3, $4) RETURNING *', values: [name, id, description, img] };
    const query2 = { text: 'INSERT INTO circle_customer(id_customer,id_circle) VALUES ($1, currval(pg_get_serial_sequence(\'circle\',\'id\')))', values: [id] };
    const circle = await client.query(query1);
    if (circle) {
      await client.query(query2);
      return circle.rows[0];
    }
    return false;
  },

  async updateCircle(id: number, datas: any) {
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

  async deleteCircle(id: number) {
    const query = { text: 'DELETE FROM "circle" WHERE "circle".id  = $1', values: [id] };
    return client.query(query);
  },
};

export default circlesDatamapper;
