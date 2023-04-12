import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const circleSchema = {
  createEvent() {
    return Joi.object({
      title: Joi.string().max(50).required(),
      description: Joi.string(),
      start: Joi.date().greater('now').format('DD/MM/YYYY hh:mm').required(),
      end: Joi.date()
        .greater('now')
        .greater(Joi.ref('start'))
        .format('DD/MM/YYYY hh:mm')
        .required(),
      allday: Joi.boolean().required()
    });
  },
  updateEvent() {
    return Joi.object({
      title: Joi.string().max(50),
      description: Joi.string(),
      start: Joi.date().greater('now').format('DD/MM/YYYY hh:mm'),
      end: Joi.date()
        .greater('now')
        .greater(Joi.ref('start'))
        .format('DD/MM/YYYY hh:mm'),
      allday: Joi.boolean()
    });
  }
};

export default circleSchema;
