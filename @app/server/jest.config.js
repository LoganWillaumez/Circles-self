/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 600000,
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).ts'],
  globalSetup: './src/app/tests/config/globalSetup.ts',
  globalTeardown: './src/app/tests/config/globalTeardown.ts'
};
