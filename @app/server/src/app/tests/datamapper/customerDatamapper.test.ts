import {validate} from 'uuid';
import customerDataMapperInstance from '../../datamapper/customerDatamapper';
import {subHours} from 'date-fns';
import {generateCustomer} from '../utils/mock/customer';
import {getPersistedDatas} from '../utils/persistentDatas';
import { CustomerInputDatas } from '@circles-self/circles/interfaces';

const customerDataMapper = customerDataMapperInstance.test;

describe('Customer Data Mapper - Integration Tests', () => {
  let createdUser: any;

  beforeAll(async () => {
    createdUser = await getPersistedDatas();
  });
  describe('Customer Data Manipulation', () => {
    // beforeEach(async () => {
    // });

    // afterEach(async () => {
    //   await testDbConnection.query('DELETE FROM "customer" WHERE email = $1', [
    //     createdUser.email,
    //   ]);
    // });

    describe('Create User', () => {
      test('should create a new user and return its data', async () => {
        expect(createdUser).toMatchObject({
          customer_id: expect.any(Number),
          firstname: createdUser.firstname,
          lastname: createdUser.lastname,
          email: createdUser.email,
          birthdate: createdUser.birthdate,
          img: createdUser.img,
          gender: createdUser.gender
        });

        expect(createdUser.identifier).toHaveLength(36);
        expect(validate(createdUser.identifier)).toBe(true);
      });
      test('should fail when required fields are missing', async () => {
        const {firstname, ...partialUserData} = createdUser;
        await expect(
          customerDataMapper.createUser(
            partialUserData as unknown as CustomerInputDatas
          )
        ).rejects.toThrowError();
      });
      test('should fail when email already exists', async () => {
        await expect(
          customerDataMapper.createUser(createdUser)
        ).rejects.toThrowError();
      });
      test('should fail when birthdate format is invalid', async () => {
        const invalidBirthdateUser = {...createdUser, birthdate: '2022-13-32'};
        await expect(
          customerDataMapper.createUser(invalidBirthdateUser)
        ).rejects.toThrowError();
      });
      test('should fail when gender value is invalid', async () => {
        const invalidGenderUser = {...createdUser, gender: 'INVALID'};
        await expect(
          customerDataMapper.createUser(invalidGenderUser)
        ).rejects.toThrowError();
      });
      test('should fail when a required field has an empty string value', async () => {
        const emptyFieldUser = {...createdUser, firstname: ''};
        await expect(
          customerDataMapper.createUser(emptyFieldUser)
        ).rejects.toThrowError();
      });
    });
    describe('Get Customer', () => {
      describe('Get customer by ID', () => {
        test('should return customer data when id is valid', async () => {
          const customer = await customerDataMapper.getCustomerById(
            createdUser.customer_id
          );
          expect(customer).toMatchObject({
            customer_id: createdUser.customer_id,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            email: createdUser.email,
            birthdate: createdUser.birthdate,
            img: createdUser.img,
            gender: createdUser.gender
          });
        });

        test('should return false when id is invalid', async () => {
          const invalidId = -1;
          const customer = await customerDataMapper.getCustomerById(invalidId);
          expect(customer).toBe(false);
        });
      });
      describe('getCustomerByEmail', () => {
        test('should return customer data when email is valid', async () => {
          const customer = await customerDataMapper.getCustomerByEmail(
            createdUser.email!
          );
          expect(customer).toMatchObject({
            customer_id: createdUser.customer_id,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            email: createdUser.email,
            birthdate: createdUser.birthdate,
            img: createdUser.img,
            gender: createdUser.gender
          });
        });

        test('should not found customer when email is invalid', async () => {
          const invalidEmail = 'invalid@example.com';
          const customer = await customerDataMapper.getCustomerByEmail(
            invalidEmail
          );
          expect(customer).toBe(undefined);
        });
      });
    });
    describe('Patch User', () => {
      test('should update a user field and return the updated user data', async () => {
        const userToUpgrade = await customerDataMapper.createUser(
          generateCustomer()
        );
        if (!userToUpgrade) {
          fail('No User to Update');
        }
        const updatedFirstname = 'UpdatedFirstname';
        const updatedUser = await customerDataMapper.patchUser(
          userToUpgrade.customer_id,
          {firstname: updatedFirstname}
        );

        expect(updatedUser).toMatchObject({
          ...userToUpgrade,
          firstname: updatedFirstname
        });
      });

      test('should update multiple user fields and return the updated user data', async () => {
        const userToUpdate = await customerDataMapper.createUser(
          generateCustomer()
        );

        const updatedData = {
          firstname: 'UpdatedFirstname',
          lastname: 'UpdatedLastname'
        };

        if (!userToUpdate) {
          fail('No User to Update');
        }

        const updatedUser = await customerDataMapper.patchUser(
          userToUpdate.customer_id,
          updatedData
        );

        expect(updatedUser).toMatchObject({
          ...userToUpdate,
          ...updatedData
        });
      });

      test('should not update user when id is invalid', async () => {
        const invalidId = -1;
        await expect(
          customerDataMapper.patchUser(invalidId, {
            firstname: 'UpdatedFirstname'
          })
        ).resolves.toBe(false);
      });

      test('should not update user when no fields are provided', async () => {
        const emptyData = {};
        const updatedUser = await customerDataMapper.patchUser(
          createdUser.customer_id,
          emptyData
        );
        console.log('🚀 ~ updatedUser:', updatedUser);

        if (updatedUser) {
          expect(updatedUser).toMatchObject(createdUser);
        } else {
          fail('No Update User');
        }
      });

      test('should throw an error when trying to update a non-existing field', async () => {
        const nonExistingFieldData = {nonExistingField: 'value'};
        await expect(
          customerDataMapper.patchUser(
            createdUser.customer_id,
            nonExistingFieldData
          )
        ).rejects.toThrowError();
      });
    });
    describe('Delete Customer', () => {
      test('should delete customer with the given id', async () => {
        // Create a customer to delete
        const createdUserToDelete = await customerDataMapper.createUser(
          generateCustomer()
        );

        // Delete the created customer
        if (createdUserToDelete) {
          await customerDataMapper.deleteCustomer(
            createdUserToDelete.customer_id
          );

          // Try to find the deleted customer
          const deletedCustomer = await customerDataMapper.getCustomerById(
            createdUserToDelete.customer_id
          );

          expect(deletedCustomer).toBe(false);
        }
      });

      test('should not throw an error when the customer id does not exist', async () => {
        const nonExistentCustomerId = -1;

        await expect(
          customerDataMapper.deleteCustomer(nonExistentCustomerId)
        ).resolves.not.toThrow();
      });
    });

    describe('validUser', () => {
      // Test 1: Should return false when user is not activated
      test('should return false if already activated', async () => {
        // Create an activated user
        const createToActivate = await customerDataMapper.createUser(
          generateCustomer()
        );

        if (createToActivate) {
          await customerDataMapper.validUser(createToActivate.identifier); // first activation
          const checkActivatedUser = await customerDataMapper.validUser(
            createToActivate.identifier
          );

          expect(checkActivatedUser).toBe(false);
        }
      });

      // Test 2: Should return false when identifier does not exist
      test('should return false when identifier does not exist', async () => {
        // Create an identifier that does not exist
        const nonExistentIdentifier = 'nonexistent-identifier';

        // Call validUser function and expect it to return false
        const validUser = await customerDataMapper.validUser(
          nonExistentIdentifier
        );
        expect(validUser).toBe(false);
      });

      // Test 3: Should activate the user when the email validation is within 24 hours
      test('should activate the user when the email validation is within 24 hours', async () => {
        // Create a user with a recent email validation but not activated
        const createdRecentUser = await customerDataMapper.createUser(
          generateCustomer()
        );

        // Call validUser function and expect it to return true
        if (createdRecentUser) {
          const validUser = await customerDataMapper.validUser(
            createdRecentUser.identifier
          );
          expect(validUser).not.toBe(false);
          const updatedUser = await customerDataMapper.getCustomerById(
            createdRecentUser.customer_id
          );
          updatedUser && expect(updatedUser.activated_at).not.toBe(null);

          // Delete the created user
          await customerDataMapper.deleteCustomer(
            createdRecentUser.customer_id
          );
        }

        // Check that the user has been activated
      });

      test('should not activate the user when the email validation is older than 24 hours', async () => {
        // Create a user with an outdated email validation but not activated
        const createdOutdatedUser = await customerDataMapper.createUser(
          generateCustomer()
        );

        // Update the email_valid timestamp to be more than 24 hours ago
        const outdatedEmailValidDate = subHours(new Date(), 25).toISOString();

        if (createdOutdatedUser) {
          await customerDataMapper.patchUser(createdOutdatedUser.customer_id, {
            email_valid: outdatedEmailValidDate
          });

          // Call validUser function and expect it to return false
          const validUser = await customerDataMapper.validUser(
            createdOutdatedUser.identifier
          );
          expect(validUser).toBe(false);

          // Check that the user has not been activated
          const nonUpdatedUser = await customerDataMapper.getCustomerById(
            createdOutdatedUser.customer_id
          );
          nonUpdatedUser
            ? expect(nonUpdatedUser.activated_at).toBe(null)
            : fail('No Update User');

          // Delete the created user
          await customerDataMapper.deleteCustomer(
            createdOutdatedUser.customer_id
          );
        } else {
          fail('No createdOutdatedUser User');
        }
      });
    });
    describe('reloadEmailValid', () => {
      test('should update the email_valid field and return the new value', async () => {
        const createdUser = await customerDataMapper.createUser(
          generateCustomer()
        );

        if (createdUser) {
          const updatedEmailValid = await customerDataMapper.reloadEmailValid(
            createdUser.customer_id
          );
          console.log('🚀 ~ updatedEmailValid:', updatedEmailValid);
          const updatedUser = await customerDataMapper.getCustomerById(
            createdUser.customer_id
          );
          console.log('🚀 ~ updatedUser:', updatedUser);

          if (!updatedEmailValid || !updatedUser) {
            fail('No Update User');
          }
          expect(updatedEmailValid).toEqual(updatedUser.email_valid);
        } else {
          fail('No createdUser User');
        }
      });
    });

    describe('checkActivatedAtByEmail', () => {
      test('should return the activated_at field when email is valid', async () => {
        const createdUser = await customerDataMapper.createUser(
          generateCustomer()
        );
        if (!createdUser) {
          fail('No createdUser User');
        }
        await customerDataMapper.validUser(createdUser.identifier);

        const activatedAt = await customerDataMapper.checkActivatedAtByEmail(
          createdUser.email!
        );
        const updatedUser = await customerDataMapper.getCustomerById(
          createdUser.customer_id
        );

        if (!updatedUser) {
          fail('No updatedUser User');
        }
        expect(activatedAt).toEqual(updatedUser.activated_at);

        await customerDataMapper.deleteCustomer(createdUser.customer_id);
      });

      test('should return false when email is invalid', async () => {
        const invalidEmail = 'invalid@example.com';
        const activatedAt = await customerDataMapper.checkActivatedAtByEmail(
          invalidEmail
        );

        expect(activatedAt).toBe(false);
      });
    });

    describe('checkActivatedAtByIdentifier', () => {
      test('should return the activated_at field when identifier is valid', async () => {
        const createdUser = await customerDataMapper.createUser(
          generateCustomer()
        );
        if (!createdUser) {
          fail('No createdUser User');
        }
        await customerDataMapper.validUser(createdUser.identifier);

        const activatedAt =
          await customerDataMapper.checkActivatedAtByIdentifier(
            createdUser.identifier
          );
        const updatedUser = await customerDataMapper.getCustomerById(
          createdUser.customer_id
        );
        if (!updatedUser) {
          fail('No updatedUser User');
        }
        expect(activatedAt).toEqual(updatedUser.activated_at);

        await customerDataMapper.deleteCustomer(createdUser.customer_id);
      });

      test('should return false when identifier is invalid', async () => {
        const invalidIdentifier = 'invalid-identifier';
        const activatedAt =
          await customerDataMapper.checkActivatedAtByIdentifier(
            invalidIdentifier
          );

        expect(activatedAt).toBe(false);
      });
    });
  });
});
