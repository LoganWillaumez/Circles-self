import {Pool} from 'pg';
import client, {connectToDatabase} from './db.config';
import {ErrorCode} from '../../../../../package/circles-types/interfaces/interfaces/errorCode';
import AppError from '../../utils/AppError';

jest.mock('pg', () => {
  return {
    Pool: jest.fn().mockImplementation(() => ({
      connect: jest.fn()
    }))
  };
});

describe('Database connection test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully connect to the database', async () => {
    (client.connect as jest.Mock).mockResolvedValueOnce(() => {
      console.log('Connection to the database successful');
    });

    await connectToDatabase();

    expect(client.connect).toHaveBeenCalledTimes(1);
  });

  it('should fail to connect to the database and return the correct error message', async () => {
    (client.connect as jest.Mock).mockRejectedValueOnce(
      new Error('Connection error')
    );

    try {
      await connectToDatabase();
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.errorCode).toBe(ErrorCode.DATABASE);
        expect(error.message).toBe('databaseNoConnection');
        expect(error.statusCode).toBe(500);
      } else {
        fail('Error should be an instance of AppError');
      }
    }

    expect(client.connect).toHaveBeenCalledTimes(1);
  });
});
