import {Request, Response} from 'express';
import AppError from '../../utils/AppError';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import customerDataMapperInstance from '../datamapper/customerDatamapper';
import { ErrorCode } from '@circles-self/circles/enums';

const customerDataMapper = customerDataMapperInstance.main;

const customerController = {
  async getCustomer(req: Request, res: Response) {
    const {user} = req;
    delete user.password;
    res.status(200).json(user);
  },

  async deleteCustomer(req: Request, res: Response) {
    const {user} = req;

    await customerDataMapper.deleteCustomer(user.id);

    const checkCustomerAfterDelete = await customerDataMapper.getCustomerById(
      user.id
    );

    if (!checkCustomerAfterDelete) {
      res.status(200).json({message: 'Customer successfully deleted.'});
    } else {
      throw new AppError(ErrorCode.CUSTOMER, 'user.cantDelete', 400);
    }
  },

  async updateCustomer(req: Request, res: Response) {
    const data = req.body;
    const {user} = req;
    const patchUser = await customerDataMapper.patchUser(user.customer_id, data);
    if (patchUser) {
      const { password, customer_id, ...updatedUser } = patchUser;
      res.status(200).json({message: 'Customer successfully updated.', updatedUser});
    } else {
      throw new AppError(ErrorCode.CUSTOMER, 'user.cantUpdate', 400);
    }
  }
};

export default wrapMethodsInTryCatch(customerController);
