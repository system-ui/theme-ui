module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['react-app'],
  plugins: ['@typescript-eslint'],
  globals: {
    __PATH_PREFIX__: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-redeclare': 'off',

    // TypeScript checks this
    'no-undef': 'off',
    'no-lone-blocks': 'off',
  },
}
