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

    // Ensure peerDependencies and dependencies are properly configured
    'import/no-extraneous-dependencies': 'error',

    // TypeScript checks this
    'no-undef': 'off',
    'no-lone-blocks': 'off',

    'react/jsx-pascal-case': 'off', // needs a fix in @theme-ui/mdx
  },
  overrides: [
    {
      files: [
        'packages/**/test/**/*.{ts,tsx,js,jsx}',
        'packages/e2e/**/*.{ts,tsx}',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-pascal-case': 'off',
      },
    },
  ],
}
