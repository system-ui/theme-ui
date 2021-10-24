// @ts-check

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest/presets/js-with-babel',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  testMatch: ['**/packages/**/test/*.{js,ts,tsx}'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/',
    '/presets/',
    '/style-guide/',
    'tailwind.config.js',
    '/dist/',
  ],
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'packages/**/src/**/*.{js,ts,tsx}',
    '!packages/docs/**/*',
    '!packages/presets/**/*',
    '!packages/style-guide/**/*',
    '!packages/gatsby-theme-style-guide/**/*',
    '!packages/chrome/**/*',
    '!packages/gatsby-theme-*/**/*',
    '!packages/preset-*/**/*',
    '!packages/test-utils/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  modulePathIgnorePatterns: ['packages/.*/dist'],
  // projects: ['<rootDir>/packages/*'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFiles: ['jest-canvas-mock'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '@theme-ui/css/dist/types': '@theme-ui/css/src/types',
  },
}

module.exports = config
