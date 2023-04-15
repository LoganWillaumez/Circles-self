import {faker} from '@faker-js/faker';

export const generateCircles = () => {
  return {
    name: faker.name.firstName(),
    customer_admin: faker.datatype.number(), // Replace this with a valid Customer ID from your test data
    description: faker.lorem.paragraph(),
    img: faker.image.business()
  };
};