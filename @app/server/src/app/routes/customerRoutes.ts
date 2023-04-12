import express from 'express';
import customerController from '../controllers/customerController';
import validationMiddleware from '../middlewares/validationMiddleware';
import customerSchema from '../services/validation/customerSchema';
import jwbtoken from '../middlewares/jwtMiddleware';

const customerRoutes = express.Router();

customerRoutes.use(jwbtoken.getAuthorization);

customerRoutes
  .get('', customerController.getCustomer)
  .delete('', customerController.deleteCustomer)
  .put(
    '',
    validationMiddleware(customerSchema.updateCustomer()),
    customerController.updateCustomer
  );

export default customerRoutes;
