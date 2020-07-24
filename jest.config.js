module.exports = {
  roots: ['src'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '.spec.ts$',
  modulePathIgnorePatterns: ['__mocks__', 'node_modules'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/typings/**',
  ],
  coverageReporters: ['lcov', 'text'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  testTimeout: 30000,
};