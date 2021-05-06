module.exports = {
  presets: [
    [require.resolve('@babel/preset-env'), { loose: true }],
    '@babel/react',
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
}
