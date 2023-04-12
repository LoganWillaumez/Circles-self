import {Pool} from 'pg';
import dbConnection from '../config/db.config';
import {testDbConnection} from '../tests/utils/testDatabase';
import { CirclesDatas, CirclesInputDatas } from '@circles-self/types';


const circlesDataMapper = (client: Pool) => {
  return {
    async getCircle(id: number): Promise<CirclesDatas | false> {
      const query = {
        text: `SELECT json_build_object(
        'circle_id', cc.id,
        'name', cc.name,
        'customer_admin', cc.customer_admin,
        'description', cc.description,
        'img', cc.img,
        'created_at', cc.created_at,
        'updated_at', cc.updated_at,
        'messages', COALESCE(jsonb_agg(m) FILTER (WHERE m.id IS NOT NULL), '[]'::jsonb),
        'events', COALESCE(jsonb_agg(e) FILTER (WHERE e.id IS NOT NULL), '[]'::jsonb)
       )
       FROM "circle" cc
       LEFT JOIN "event" e ON cc.id = e.id_circle
       LEFT JOIN "message" m ON cc.id = m.id_circle
       WHERE cc.id=$1
       GROUP BY cc.id;`,
        values: [id]
      };
      const circle = await client.query(query);
      if (circle?.rows[0]?.json_build_object) {
        const result = circle.rows[0].json_build_object;
        result.created_at = new Date(result.created_at);
        result.updated_at = new Date(result.updated_at);
        return result;
      } else {
        return false;
      }
    },

    async createCircle(
      id: number,
      datas: CirclesInputDatas
    ): Promise<CirclesDatas | false> {
      const {name, description, img} = datas;
      const query1 = {
        text: 'INSERT INTO circle(name, customer_admin, description, img) VALUES ($1, $2, $3, $4) RETURNING id as circle_id, name, customer_admin, description, img, created_at, updated_at;',
        values: [name, id, description, img]
      };
      const query2 = {
        text: "INSERT INTO circle_customer(id_customer,id_circle) VALUES ($1, currval(pg_get_serial_sequence('circle','id')));",
        values: [id]
      };
      const circle = await client.query(query1);
      console.log('🚀 ~ circle:', circle.rows[0]);
      if (circle) {
        const circleCustomer = await client.query(query2);
        console.log('🚀 ~ circleCustomer:', circleCustomer.rows[0]);
        const updatedCircle = {...circle.rows[0], ...circleCustomer.rows[0]};
        return updatedCircle;
      }
      return false;
    },

    async updateCircle(
      id: number,
      datas: Partial<CirclesInputDatas>
    ): Promise<CirclesDatas | false> {
      const fields = Object.keys(datas).map(
        (prop, index) =>
          `"${prop}" = COALESCE(NULLIF($${index + 1}, ''), "${prop}")`
      );
      const values = Object.values(datas);

      const updatedCircle = await client.query(
        `UPDATE "circle"
         SET ${fields.join(', ')}
         WHERE id = $${fields.length + 1}
         RETURNING *`,
        [...values, id]
      );
      return updatedCircle?.rows[0] ?? false;
    },

    async deleteCircle(id: number): Promise<void> {
      const query = {
        text: 'DELETE FROM "circle" WHERE "circle".id  = $1',
        values: [id]
      };
      await client.query(query);
    }
  };
};

const circlesDataMapperInstance = {
  main: circlesDataMapper(dbConnection),
  test: circlesDataMapper(testDbConnection)
};

export default circlesDataMapperInstance;
