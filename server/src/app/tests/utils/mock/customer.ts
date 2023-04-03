import { faker } from "@faker-js/faker";
import { CustomerInputDatas } from "../../../../ts/interfaces/customer.interfaces";

export const generateCustomer = (): CustomerInputDatas => {
    return {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate().toISOString().split('T')[0],
      img: faker.image.avatar(),
      gender: faker.name.sex(),
    };
  };