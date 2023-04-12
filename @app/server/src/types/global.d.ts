import {CustomerDatas} from '../../../../package/circles-types/interfaces/interfaces/customer.interfaces';

declare namespace jestGlobal {
  let testUser: any;
}

declare global {
  var jestTestUser: CustomerDatas;
}


export {};