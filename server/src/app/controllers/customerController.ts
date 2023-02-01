import { Request, Response } from 'express';
import customerDatamapper from '../datamapper/customerDatamapper';

const customerController = {
  async getCustomer(req: Request, res: Response) {
    const { user } = req;
    delete user.password;
    res.status(200).json(user);
  },

  async deleteCustomer(req: Request, res: Response) {
    const { user } = req;

    await customerDatamapper.deleteCustomer(user.id);

    const checkCustomerAfterDelete = await customerDatamapper.getCustomerById(user.id);

    if (!checkCustomerAfterDelete) {
      res.status(200).json({ message: 'Customer successfully deleted.' });
    } else {
      res.status(400);
      throw new Error('User can\'t be deleted');
    }
  },

  async updateCustomer(req: Request, res: Response) {
    const data = req.body;
    const { user } = req;
    const patchUser = await customerDatamapper.patchUser(user.id, data);
    if (patchUser) {
      delete patchUser.password;
      delete patchUser.id;
      res.status(200).json({ message: 'Customer successfully patch.', patchUser });
    } else {
      res.status(400);
      throw new Error('User can\'t be updated');
    }
  },
};

export default customerController;
