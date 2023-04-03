import { exec } from "child_process";
import { promisify } from "util";
import customerDataMapperInstance from "../../datamapper/customerDatamapper";
import { generateCustomer } from "../utils/mock/customer";
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);

const startTestDB = async () => {
    const { stdout } = await execPromise('docker ps --format "{{.Names}}"');
    if (stdout && stdout.includes('circles-test')) {
      console.log('The test database is already running.');
      return;
    }
  
    // Start the test database
    await execPromise('npm run start:test');
    console.log('Test database started successfully.');
  };

module.exports = async () => {
    await startTestDB();
    const createUser = await customerDataMapperInstance.test.createUser(generateCustomer());
    if(createUser) {
      const tempFilePath = path.join(process.cwd(), 'temp-user-info.json');
      fs.writeFileSync(tempFilePath, JSON.stringify(createUser));
    } else {
      throw new Error('Could not create test user.');
    }
  };




