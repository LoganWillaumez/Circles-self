import { differenceInHours, differenceInSeconds } from 'date-fns';
import client from '../config/db.config';
import { registerData } from '../../ts/interfaces/customer.interfaces';

const customerDataMapper: any = {
  async getCustomerById(id: number) {
    const query = {
      text:
          'SELECT json_build_object('
          + '\'id\',c.id, '
          + '\'firstname\', c.firstname, '
          + '\'lastname\', c.lastname, '
          + '\'gender\', c.gender, '
          + '\'email\', c.email, '
          + '\'birthdate\', c.birthdate, '
          + '\'firstconnect\', c.firstconnect, '
          + '\'firstcircle\', c.firstcircle, '
          + '\'img\', c.img, '
          + '\'created_at\', c.created_at, '
          + '\'updated_at\', c.updated_at, '
          + '\'circles\', jsonb_agg(cc)) '
          + 'FROM "customer" c '
          + 'LEFT JOIN "circle_customer" cu ON c.id = cu.id_customer '
          + 'LEFT JOIN circle cc ON cc.id = cu.id_circle WHERE c.id=$1 GROUP BY c.id;',
      values: [id],
    };
    const customer = await client.query(query);
    if (customer) {
      return customer.rows[0].json_build_object;
    }
    return false;
  },

  async getCustomerByEmail(email: string) {
    const query = { text: 'SELECT * FROM "customer" WHERE "customer".email = $1', values: [email] };
    const customer = await client.query(query);
    if (customer) {
      return customer.rows[0];
    }
    return false;
  },

  async createUser(userData: registerData) {
    const {
      firstname, lastname, email, password, birthdate, img, gender,
    } = userData;
    const query = {
      text: `INSERT INTO "customer" ("firstname","lastname", "email", "password", "birthdate","img", "gender")
              VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "customer".id as customer_id, "customer".firstname, "customer".lastname,"customer".email, "customer".birthdate, "customer".img, "customer".gender, "customer".identifier`,
      values: [
        firstname,
        lastname,
        email,
        password,
        birthdate,
        img,
        gender,
      ],
    };

    const newUser = await client.query(query);
    if (newUser.rowCount) {
      return newUser.rows[0];
    }
    return false;
  },

  async patchUser(id: number, data: any) {
    const fields = Object.keys(data).map((prop, index) => {
      if (prop === 'birthdate') {
        return `"${prop}" = $${index + 1}`;
      } if (prop === 'firstconnect') {
        return `"${prop}" = $${index + 1}`;
      } if (prop === 'firstcircle') {
        return `"${prop}" = $${index + 1}`;
      }
      return `"${prop}" = COALESCE(NULLIF($${index + 1}, ''), "${prop}")`;
    });

    const values = Object.values(data);

    const updatedUser = await client.query(
      `UPDATE "customer" SET ${fields} WHERE id = $${
        fields.length + 1
      } RETURNING *`,
      [...values, id],
    );
    if (updatedUser) {
      return updatedUser.rows[0];
    }
    return false;
  },

  async deleteCustomer(id: number) {
    const query = { text: 'DELETE FROM "customer" WHERE "customer".id  = $1', values: [id] };
    return client.query(query);
  },

  async validUser(identifier: string) {
    const result = await client.query(
      'SELECT "customer".email_valid FROM "customer" WHERE "customer".identifier = $1',
      [identifier],
    );

    if (!result.rows.length) {
      return false;
    }

    const { email_valid: emailValid } = result.rows[0];
    const currentDateTime = new Date();

    if (differenceInSeconds(currentDateTime, emailValid) < 20) {
      const updatedCustomer = await client.query(
        'UPDATE "customer" SET activated_at = $1 WHERE identifier = $2 RETURNING "customer".activated_at',
        [currentDateTime.toISOString(), identifier],
      );
      return updatedCustomer.rows[0].activated_at;
    }
    return false;
  },
  async reloadEmailValid(id: string) {
    const currentDateTime = new Date();
    const updatedCustomer = await client.query(
      'UPDATE customer SET "customer".email_valid = $1 WHERE id = $2 RETURNING "customer".email_valid',
      [currentDateTime, id],
    );
    return updatedCustomer.rows[0].emailValid;
  },
};

export default customerDataMapper;
