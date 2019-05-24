const path = require('path')
const { getOptions } = require('loader-utils')

module.exports = function () {
  const opts = getOptions(this)
  const themeFile = path.join(opts.dirname, 'themes.json')
  const componentsFile = path.join(opts.dirname, 'components.json')
  const themes = require(themeFile)
  const components = require(componentsFile)

  return `
    export const themes = [
      ${themes.map(filename => `require('${filename}').default`)}
    ]

    export const components = [
      ${components.map(filename => `require('${filename}').default`)}
    ]

    export default {
      themes,
      components,
    }

    if (module.hot) module.hot.accept()
  `
}
