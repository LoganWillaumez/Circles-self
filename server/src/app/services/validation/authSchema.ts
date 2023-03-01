import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const authSchema = {
  signin() {
    return Joi.object({
      email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi
        .string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    });
  },
  signup() {
    return Joi.object({
      firstname: Joi
        .string()
        .max(20)
        .required(),
      lastname: Joi
        .string()
        .max(20)
        .required(),
      // .messages({
      //   'string.base': '"lastname" should be a type of \'string\'',
      //   'string.empty': '"lastname" cannot be an empty field',
      //   'string.max': '"lastname" should have a maximum length of {#limit}',
      //   'any.required': '"lastname" is a required field',
      // }),
      email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      gender: Joi
        .string()
        .valid('male', 'female', 'other')
        .required(),
      password: Joi
        .string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmPassword: Joi
        .string()
        .required()
        .valid(Joi.ref('password')),
      birthdate: Joi
        .date()
        .format('YYYY-MM-DD')
        .required(),
      img: Joi
        .string()
        .allow(''),
    });
  },
};

export default authSchema;
