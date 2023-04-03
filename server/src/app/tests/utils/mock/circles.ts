import { faker } from "@faker-js/faker";

export const generateCircles = () => {
    return {
        name: faker.name.firstName(),
        customer_admin: faker.datatype.number(), // Replace this with a valid Customer ID from your test data
        description: faker.lorem.paragraph(),
        img: faker.image.business(),
    };
  };


//   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
//   "name" VARCHAR(50) NOT NULL,
//   customer_admin int NOT NULL,
//   FOREIGN KEY (customer_admin) REFERENCES Customer(id) ON UPDATE CASCADE ON DELETE CASCADE,
//   "description" TEXT,
//   "img" TEXT,
//   "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
//   "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP