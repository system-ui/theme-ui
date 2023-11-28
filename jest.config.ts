// @ts-check

import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
    '^.+\\.m?jsx?$': '<rootDir>/jest-preprocess.js',
  },
  testMatch: [
    '**/packages/**/test/*.{js,ts,tsx,mjs}',
    '**/packages/*/src/**/*.spec.{js,ts,tsx,mjs}',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/',
    '/presets/',
    '/style-guide/',
    'tailwind.config.js',
    '/dist/',
    '/__test-utils__/',
    '/node_modules/(?!(@babel/runtime|gatsby))',
  ],
  coverageReporters: ['lcov', 'text', 'html'],
  coverageProvider: 'v8',
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
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '@theme-ui/css/dist/types': '@theme-ui/css/src/types',
  },
}

module.exports = config
