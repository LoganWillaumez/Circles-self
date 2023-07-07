import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const circleSchema = {
  createCircle() {
    return Joi.object({
      name: Joi.string().max(50).required(),
      description: Joi.string(),
      img: Joi.string()
    });
  },
  inviteCircle() {
    return Joi.object({
      email: Joi.string().email().required()
    });
  },
  updateCircle() {
    return Joi.object({
      name: Joi.string().max(50),
      description: Joi.string(),
      img: Joi.string()
    });
  },
  deleteCircle() {
    return Joi.object({
      params: Joi.object({
        id: Joi.string().guid().required()
      })
    });
  }
};

export default circleSchema;
