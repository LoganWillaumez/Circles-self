import {CustomerDatas} from '../../ts/interfaces/customer.interfaces';

declare global {
  namespace Express {
    interface Request {
      user: CustomerDatas;
    }
  }
}
