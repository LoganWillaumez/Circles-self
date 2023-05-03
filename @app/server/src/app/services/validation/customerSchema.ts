import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const customerSchema = {
  deleteCustomer() {
    return Joi.object({
      email: Joi.string()
        .email({tlds: {allow: false}})
        .required()
        .messages({
          'string.string': 'email.string',
          'string.email': 'email.email',
          'any.required': 'emailRequired'
        })
    });
  },
  updateCustomer() {
    return Joi.object({
      firstname: Joi.string().max(20).messages({
        'string.string': 'firstName.string',
        'string.max': 'firstName.max'
      }),
      initiallogin: Joi.boolean().messages({
        'boolean.base': 'initialLogin.boolean'
      }),
      lastname: Joi.string().max(20).messages({
        'string.string': 'lastname.string',
        'string.max': 'lastname.max'
      }),
      email: Joi.string()
        .email({tlds: {allow: false}})
        .messages({
          'string.string': 'email.string',
          'string.email': 'email.email'
        }),
      gender: Joi.string().valid('male', 'female', 'other').messages({
        'gender.string': 'gender.string',
        'any.only': 'gender.valid'
      }),
      currentpassword: Joi
      .string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .allow('')
      .optional()
      .messages({
        'string.string': 'password.string',
        'string.pattern.base': 'password.pattern'
      }),
    newpassword: Joi
      .string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .allow('')
      .optional()
      .not(Joi.ref('currentpassword'))
      .messages({
        'string.string': 'newPassword.string',
        'string.pattern.base': 'newPassword.pattern',
        'any.invalid': 'newPasswordMustBeDifferent'
      }),
    confirmpassword: Joi
      .string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .allow('')
      .optional()
      .valid(Joi.ref('newpassword'))
      .messages({
        'string.string': 'confirmPassword.string',
        'string.pattern.base': 'confirmPassword.pattern',
        'any.only': 'confirmPasswordMatchNewPassword'
      }),
      birthdate: Joi.date().format('YYYY-MM-DD').messages({
        'date.base': 'birthDate.date',
        'date.format': 'birthDate.format'
      }),
      img: Joi.string().allow('').messages({
        'string.base': 'img.string',
        'string.pattern.base': 'ing.base64'
      })
    });
  }
};

export default customerSchema;
