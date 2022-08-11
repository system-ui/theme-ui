module.exports = require('babel-jest').default.createTransformer({
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  overrides: [
    {
      test: /gatsby-plugin-theme-ui/,
      presets: ['babel-preset-gatsby'],
    },
  ],
})
