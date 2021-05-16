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
  },
}
