module.exports = {
  presets: ['@babel/env', '@babel/react'],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
    },
  },
}
