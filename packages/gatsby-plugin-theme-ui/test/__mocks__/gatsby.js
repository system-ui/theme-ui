const React = require('react')
const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    themeUiConfig: {
      preset: {},
      prismPreset: {},
    },
  })),
}
