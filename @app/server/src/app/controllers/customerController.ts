import {Request, Response} from 'express';
import AppError from '../../utils/AppError';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import customerDataMapperInstance from '../datamapper/customerDatamapper';
import { ErrorCode } from '@circles-self/circles/enums';
import bcrypt from 'bcrypt';

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
  const { currentpassword, newpassword, confirmpassword, ...data } = req.body;
  const { user } = req;

  // Remove empty fields and password fields from the request to avoid updating them directly
  Object.keys(data).forEach((key) => {
    if (data[key] === '') {
      delete data[key];
    }
  });

  const customerToCheck = await customerDataMapper.getCustomerByEmail(user.email);

  if (currentpassword && newpassword && confirmpassword && customerToCheck && customerToCheck?.password) {

    const isCurrentPasswordValid = await bcrypt.compare(currentpassword, customerToCheck.password);

    if (!isCurrentPasswordValid) {
      throw new AppError(ErrorCode.CUSTOMER, 'user.invalidCurrent', 400);
    } else {
      if (newpassword && confirmpassword && newpassword === confirmpassword) {
        // Check if the new password is the same as the old password
        if (newpassword === currentpassword) {
          throw new AppError(ErrorCode.CUSTOMER, 'user.newPasswordSameAsOld', 400);
        } else {
          // Hash the new password before storing it
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newpassword, salt);
          data.password = hashedPassword;
        }
      } else {
        throw new AppError(ErrorCode.CUSTOMER, 'user.passwordsDontMatch', 400);
      }
    }
  }
  const patchUser = await customerDataMapper.patchUser(user.customer_id, data);
  if (patchUser) {
    const { password, customer_id, ...updatedUser } = patchUser;
    res.status(200).json({
      message: 'Customer successfully updated.',
      updatedUser,
    });
  } else {
    throw new AppError(ErrorCode.CUSTOMER, 'user.cantUpdate', 400);
  }
}
};
export default wrapMethodsInTryCatch(customerController);
