const path = require('path')
const { getOptions } = require('loader-utils')

module.exports = function () {
  const opts = getOptions(this)
  const filename = path.join(opts.dirname, 'themes.json')
  const themes = require(filename)

  return `
    export const themes = [
      ${themes.map(filename => `require('${filename}').default`)}
    ]

    export default {
      themes,
    }

    if (module.hot) module.hot.accept()
  `
}
