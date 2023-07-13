import {differenceInHours} from 'date-fns';
import dbConnection from '../config/db.config';
import {Pool} from 'pg';
import {testDbConnection} from '../tests/utils/testDatabase';
import { CustomerDatas, CustomerInputDatas } from '@circles-self/circles/interfaces';

const customerDataMapper = (client: Pool) => {
  return {
    async getCustomerById(id: number): Promise<CustomerDatas | false> {
      const query = {
        text: `
          SELECT c.id as customer_id, c.firstname, c.lastname, c.gender, c.email, TO_CHAR(c.birthdate, 'YYYY-MM-DD') as birthdate, c.initiallogin, c.initialcircle, c.img, c.created_at, c.activated_at, c.identifier, c.email_valid, c.updated_at, COALESCE(json_agg(json_build_object('circle_id', cc.id, 'name', cc.name, 'description', cc.description)) FILTER (WHERE cc.id IS NOT NULL), '[]') as circles
          FROM "customer" c
          LEFT OUTER JOIN "circle_customer" cu ON c.id = cu.id_customer
          LEFT OUTER JOIN circle cc ON cc.id = cu.id_circle
          WHERE c.id=$1
          GROUP BY c.id
        `,
        values: [id]
    };
    
      const customer = await client.query(query);

      return customer?.rows[0] ?? false;
    },

    async getCustomerByEmail(email: string): Promise<CustomerDatas | false> {
      const query = {
        text: `SELECT id as customer_id, firstname, lastname, password, gender, email, TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate, activated_at, initiallogin, initialcircle, img, created_at, identifier, updated_at
         FROM "customer"
         WHERE "customer".email = $1`,
        values: [email]
      };
      const customer = await client.query(query);
      return customer?.rows[0] ?? false;
    },

    async createUser(
      userData: CustomerInputDatas
    ): Promise<CustomerDatas | false> {
      const {firstname, lastname, email, password, birthdate, gender} =
      userData;
      const query = {
        text: `INSERT INTO "customer" ("firstname","lastname", "email", "password", "birthdate", "gender")
              VALUES ($1,$2,$3,$4,$5,$6) RETURNING "customer".id as customer_id, "customer".firstname, "customer".lastname,"customer".email, TO_CHAR("customer".birthdate, 'YYYY-MM-DD') as birthdate, "customer".gender, "customer".identifier`,
        values: [firstname, lastname, email, password, birthdate, gender]
      };

      try {
        const newUser = await client.query(query);
        if (newUser.rowCount) {
          return newUser.rows[0];
        } else {
          return false;
        }
      } catch (err){
        return false;
      }
      
    },

    async patchUser(id: number, data: any): Promise<CustomerDatas | false> {
      if (Object.keys(data).length === 0) {
        return await this.getCustomerById(id);
      }
    
      const fields = Object.keys(data).map((prop, index) => {
        if (prop === 'email_valid') {
          return `"${prop}" = $${index + 1}::timestamp`;
        }
        return `"${prop}" = $${index + 1}`;
      });
    
      const values = Object.values(data);
    
      const updatedUser = await client.query(
        `UPDATE "customer" SET ${fields.join(', ')} WHERE id = $${
          fields.length + 1
        } RETURNING *, "customer".id as customer_id, TO_CHAR("customer".birthdate, 'YYYY-MM-DD') as birthdate`,
        [...values, id]
      );
    
      if (updatedUser && updatedUser.rows.length > 0) {
        return updatedUser.rows[0];
      }
      return false;
    },
    

    async deleteCustomer(id: number) {
      const query = {
        text: 'DELETE FROM "customer" WHERE "customer".id  = $1',
        values: [id]
      };
      return client.query(query);
    },

    async checkActivatedAtByEmail(email: string): Promise<Date | false> {
      const query = await client.query(
        'SELECT activated_at FROM customer WHERE email = $1',
        [email]
      );
      if (query.rows[0] && query.rows[0].activated_at) {
        return query.rows[0].activated_at;
      }
      return false;
    },

    async checkActivatedAtByIdentifier(
      identifier: string
    ): Promise<Date | false> {
      const query = await client.query(
        'SELECT "customer".activated_at FROM "customer" WHERE "customer".identifier = $1',
        [identifier]
      );

      if (query.rows[0]) {
        return query.rows[0].activated_at;
      }
      return false;
    },
    async validUser(identifier: string): Promise<Date | false> {
      const activatedAt = await customerDataMapper(
        client
      ).checkActivatedAtByIdentifier(identifier);
      if (activatedAt) {
        return false;
      }

      const result = await client.query(
        'SELECT "customer".email_valid FROM "customer" WHERE "customer".identifier = $1',
        [identifier]
      );

      if (!result.rows.length) {
        return false;
      }

      const {email_valid} = result.rows[0];

      const currentDateTime = new Date();

      const hoursDifference = differenceInHours(
        currentDateTime,
        new Date(email_valid)
      );

      if (hoursDifference >= 24) {
        return false;
      }

      const activation = await client.query(
        'UPDATE "customer" SET activated_at = $1 WHERE identifier = $2 RETURNING "customer".activated_at',
        [currentDateTime, identifier]
      );

      if (activation.rows[0].activated_at) {
        return activation.rows[0].activated_at;
      }
      return false;
    },
    async reloadEmailValid(id: number): Promise<Date | false> {
      const currentDateTime = new Date();
      const updatedCustomer = await client.query(
        'UPDATE customer SET email_valid = $1 WHERE id = $2 RETURNING customer.email_valid',
        [currentDateTime, id]
      );
      return updatedCustomer.rows[0].email_valid;
    },
  };
};

const customerDataMapperInstance = {
  main: customerDataMapper(dbConnection),
  test: customerDataMapper(testDbConnection)
};

export default customerDataMapperInstance;
