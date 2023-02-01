import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const customerSchema = {
  deleteCustomer() {
    return Joi.object({
      email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
    });
  },
  updateCustomer() {
    return Joi.object({
      firstname: Joi
        .string()
        .max(20),
      lastname: Joi
        .string()
        .max(20),
      // .messages({
      //   'string.base': '"lastname" should be a type of \'string\'',
      //   'string.empty': '"lastname" cannot be an empty field',
      //   'string.max': '"lastname" should have a maximum length of {#limit}',
      //   'any.required': '"lastname" is a required field',
      // }),
      email: Joi
        .string()
        .email({ tlds: { allow: false } }),
      gender: Joi
        .string(),
      password: Joi
        .string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
      repeat_password: Joi.ref('password'),
      birthdate: Joi
        .date()
        .format('DD-MM-YYYY'),
      img: Joi.string().allow(''),
    });
  },
};

export default customerSchema;
