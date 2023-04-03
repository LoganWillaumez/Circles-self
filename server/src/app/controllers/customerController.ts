import { Request, Response } from 'express';
import { ErrorCode } from '../../ts/interfaces/errorCode';
import AppError from '../../utils/AppError';
import { wrapMethodsInTryCatch } from '../../utils/tryCatch';
import customerDataMapperInstance from '../datamapper/customerDatamapper';

const customerDataMapper = customerDataMapperInstance.main;

const customerController = {
  async getCustomer(req: Request, res: Response) {
    const { user } = req;
    delete user.password;
    res.status(200).json(user);
  },

  async deleteCustomer(req: Request, res: Response) {
    const { user } = req;

    await customerDataMapper.deleteCustomer(user.id);

    const checkCustomerAfterDelete = await customerDataMapper.getCustomerById(user.id);

    if (!checkCustomerAfterDelete) {
      res.status(200).json({ message: 'Customer successfully deleted.' });
    } else {
      throw new AppError(ErrorCode.CUSTOMER, 'user.cantDelete', 400);
    }
  },

  async updateCustomer(req: Request, res: Response) {
    const data = req.body;
    const { user } = req;
    const patchUser = await customerDataMapper.patchUser(user.id, data);
    if (patchUser) {
      delete patchUser.password;
      delete patchUser.id;
      res.status(200).json({ message: 'Customer successfully patch.', patchUser });
    } else {
      throw new AppError(ErrorCode.CUSTOMER, 'user.cantUpdate', 400);
    }
  },
};

export default wrapMethodsInTryCatch(customerController);
