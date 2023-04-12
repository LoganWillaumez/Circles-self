import {exec} from 'child_process';
import {promisify} from 'util';
import {testDbConnection} from '../utils/testDatabase';

const execPromise = promisify(exec);

const stopTestDB = async () => {
  try {
    await testDbConnection.end();
    await execPromise('npm run stop:test');
    console.log('Test database stopped successfully.');
  } catch (error) {
    console.error('Error stopping test database:', error);
    throw error;
  }
};

module.exports = async () => {
  await stopTestDB();
};
