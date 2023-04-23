import { CirclesDatas, CustomerDatas } from '@circles-self/circles/interfaces';
import circlesDataMapperInstance from '../../datamapper/circlesDatamapper';
import customerDataMapperInstance from '../../datamapper/customerDatamapper';
import {generateCircles} from '../utils/mock/circles';
import {generateCustomer} from '../utils/mock/customer';
import {getPersistedDatas} from '../utils/persistentDatas';

const testCircle = generateCircles();

const circlesDataMapper = circlesDataMapperInstance.test;

describe('Circles Data Mapper - Integration Tests', () => {
  let circleTest: CirclesDatas;
  let createdUser: CustomerDatas;
  beforeAll(async () => {
    // Create a test customer
    createdUser = getPersistedDatas();
    const circleGet = await circlesDataMapper.createCircle(
      createdUser.customer_id,
      testCircle
    );
    if (!circleGet) {
      throw new Error('Could not create test circle.');
    }
    circleTest = circleGet;
  });

  describe('Create a circle', () => {
    test('should create a circle and return his datas', async () => {
      const createdCircle = await circlesDataMapper.createCircle(
        createdUser.customer_id,
        circleTest
      );
      if (createdCircle !== false) {
        expect(createdCircle).toMatchObject({
          ...createdCircle,
          customer_admin: createdUser.customer_id
        });
      } else {
        fail('Circle creation failed');
      }
    });
  });

  test('getCircle', async () => {
    const retrievedCircle = await circlesDataMapper.getCircle(
      circleTest.circle_id
    );
    if (retrievedCircle !== false) {
      expect(retrievedCircle).toMatchObject({
        ...circleTest,
        circle_id: circleTest.circle_id,
        customer_admin: createdUser.customer_id
      });
    } else {
      fail('Circle retrieval failed');
    }
  });

  test('updateCircle', async () => {
    const updatedData: Partial<CirclesDatas> = {
      name: 'Updated Test Circle',
      description: 'This is an updated test circle.',
      img: 'https://test.com/img-updated.jpg'
    };
    const updatedCircle = await circlesDataMapper.updateCircle(
      circleTest.circle_id,
      updatedData
    );
    if (updatedCircle !== false) {
      expect(updatedCircle).toMatchObject({
        ...updatedData,
        id: circleTest.circle_id,
        customer_admin: createdUser.customer_id
      });
    } else {
      fail('Circle update failed');
    }
  });

  test('deleteCircle', async () => {
    // Create a circle to be deleted in this test
    const newAdminCustomer = await customerDataMapperInstance.test.createUser(
      generateCustomer()
    );
    if (!newAdminCustomer) {
      fail('Customer creation for deletion failed');
    }
    const circleToDelete = await circlesDataMapper.createCircle(
      newAdminCustomer.customer_id,
      testCircle
    );
    if (circleToDelete !== false) {
      await circlesDataMapper.deleteCircle(circleToDelete.circle_id);
      const retrievedCircle = await circlesDataMapper.getCircle(
        circleToDelete.circle_id
      );
      expect(retrievedCircle).toBe(false);
    } else {
      fail('Circle creation for deletion failed');
    }
  });
});
