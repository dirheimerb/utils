/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.jest/cache',
  coverageDirectory: '.jest/coverage',
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['src/**/*.ts'],
  cache: true,
  collectCoverage: true,
  coverageProvider: 'v8',
};