import { CustomerDatas } from "../ts/interfaces/customer.interfaces";

declare namespace jestGlobal {
    let testUser: any;
  }

  declare global {
    var jestTestUser: CustomerDatas;
  }