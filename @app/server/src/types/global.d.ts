import {CustomerDatas} from '../../../../package/circles/interfaces/interfaces/customer.interfaces';

declare namespace jestGlobal {
  let testUser: any;
}

declare global {
  var jestTestUser: CustomerDatas;
}


export {};