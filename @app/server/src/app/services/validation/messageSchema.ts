import BaseJoi from 'joi';

const Joi = BaseJoi;

const messageSchema = {
  createMessage() {
    return Joi.object({
      content: Joi.string().required(),
    });
  },
};

export default messageSchema;
