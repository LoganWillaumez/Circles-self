import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const authSchema = {
  signin() {
    return Joi.object({
      email: Joi.string()
        .email({tlds: {allow: false}})
        .required()
        .messages({
          'string.string': 'email.string',
          'string.email': 'email.email',
          'any.required': 'email.required'
        }),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .messages({
          'string.string': 'password.string',
          'string.pattern.base': 'password.pattern',
          'any.required': 'password.required'
        })
    });
  },
  signup() {
    return Joi.object({
      firstname: Joi.string().max(20).required().messages({
        'string.string': 'firstName.string',
        'string.max': 'firstName.max',
        'any.required': 'firstName.required'
      }),
      lastname: Joi.string().max(20).required().messages({
        'string.string': 'lastname.string',
        'string.max': 'lastname.max',
        'any.required': 'lastname.required'
      }),
      email: Joi.string()
        .email({tlds: {allow: false}})
        .required()
        .messages({
          'string.string': 'email.string',
          'string.email': 'email.email',
          'any.required': 'email.required'
        }),
      gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
          'string.string': 'gender.gender',
          'any.only': 'gender.valid',
          'any.required': 'gender.required'
        }),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .messages({
          'string.string': 'password.string',
          'string.pattern.base': 'password.pattern',
          'any.required': 'password.required'
        }),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'string.string': 'confirmPassword.string',
          'string.pattern.base': 'confirmPassword.pattern',
          'any.required': 'confirmPassword.required'
        }),
      birthdate: Joi.date().format('YYYY-MM-DD').required().messages({
        'date.base': 'birthDate.date',
        'date.format': 'birthDate.format',
        'any.required': 'birthDate.required'
      }),
      img: Joi.string()
        .pattern(/^data:image\/\w+;base64,/)
        .allow('')
        .messages({
          'string.base': 'img.string',
          'string.pattern.base': 'ing.base64'
        })
    });
  }
};

export default authSchema;
