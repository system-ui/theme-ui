module.exports = {
  presets: ['@babel/env', '@babel/react', '@babel/preset-typescript'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
}
