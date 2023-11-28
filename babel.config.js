module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: false,
        targets: '> 0.25%, not dead, not ie 11',
      },
    ],
    [
      '@babel/react',
      {
        runtime: 'automatic',
        importSource: '@theme-ui/core',
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
}
