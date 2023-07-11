import {Pool} from 'pg';
import dbConnection from '../config/db.config';
import {testDbConnection} from '../tests/utils/testDatabase';
import { CirclesDatas, CirclesInputDatas } from '@circles-self/circles/interfaces';
import { utcToZonedTime } from 'date-fns-tz'


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
                'identifier', cc.identifier,
                'created_at', cc.created_at,
                'updated_at', cc.updated_at,
                'messages', COALESCE((SELECT jsonb_agg(
                                        json_build_object(
                                          'id', m.id,
                                          'customer_id', m.id_customer,
                                          'content', m.content,
                                          'created_at', m.created_at,
                                          'name', c.firstname
                                        )
                                      ) FROM message m
                                      LEFT JOIN customer c ON m.id_customer = c.id
                                      WHERE m.id_circle = cc.id), '[]'::jsonb),
                'events', COALESCE((SELECT jsonb_agg(e) FROM event e WHERE e.id_circle = cc.id), '[]'::jsonb)
               )
               FROM "circle" cc
               WHERE cc.id=$1
               GROUP BY cc.id;`,
        values: [id]
      };      
      
      const circle = await client.query(query);
      if (circle?.rows[0]?.json_build_object) {
        const result = circle.rows[0].json_build_object;
    
        // Conversion des dates UTC en fuseau horaire local pour chaque événement
        for (let event of result.events) {
          event.start = utcToZonedTime(event.start, 'Etc/UTC');
          event.end = utcToZonedTime(event.end, 'Etc/UTC');
        }
    
        return result;
      } else {
        return false;
      }
    },

    async getCircleByIdentifier(identifier: string): Promise<CirclesDatas | false> {
      const query = {
        text: `SELECT json_build_object(
                'circle_id', cc.id,
                'name', cc.name,
                'customer_admin', cc.customer_admin,
                'description', cc.description,
                'img', cc.img,
                'identifier', cc.identifier,
                'created_at', cc.created_at,
                'updated_at', cc.updated_at,
                'events', COALESCE(jsonb_agg(e) FILTER (WHERE e.id IS NOT NULL), '[]'::jsonb)
               )
               FROM "circle" cc
               LEFT JOIN "event" e ON cc.id = e.id_circle
               WHERE cc.identifier=$1
               GROUP BY cc.id;`,
        values: [identifier]
      };
    
      const circle = await client.query(query);
      if (circle?.rows[0]?.json_build_object) {
        const result = circle.rows[0].json_build_object;
    
        for (let event of result.events) {
          event.start = utcToZonedTime(event.start, 'Etc/UTC');
          event.end = utcToZonedTime(event.end, 'Etc/UTC');
        }
    
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
      if (circle) {
        const circleCustomer = await client.query(query2);
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
    },
    async addCustomerToCircle(circle_id: number, customer_id: number): Promise<boolean> {
      // d'abord, vérifions si l'entrée existe déjà
      const checkQuery = {
        text: 'SELECT * FROM circle_customer WHERE id_circle = $1 AND id_customer = $2;',
        values: [circle_id, customer_id]
      };
    
      const result = await client.query(checkQuery);
    
      
      // si l'entrée n'existe pas, procédez à l'insertion
      if(result.rows.length === 0){
        try{
          console.log('qeruy ok ');
          const insertQuery = {
            text: 'INSERT INTO circle_customer(id_circle, id_customer) VALUES ($1, $2);',
            values: [circle_id, customer_id]
          };
          await client.query(insertQuery);
        } catch (err){
          console.log('errrrr', err);
        }
    
        return true;
      } else {
       return false;
      }
    }
    
    
    
  };
};

const circlesDataMapperInstance = {
  main: circlesDataMapper(dbConnection),
  test: circlesDataMapper(testDbConnection)
};

export default circlesDataMapperInstance;
