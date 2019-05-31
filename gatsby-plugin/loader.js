const path = require('path')
const { getOptions } = require('loader-utils')

const themeModules = []
console.log('loader')

module.exports = function () {
  const opts = getOptions(this)

  if (opts.theme) {
    themeModules.push(opts.theme)
    this.addDependency(opts.theme)
  }

  if (Array.isArray(opts.themes)) {
    opts.themes.forEach(theme => {
      themeModules.push(theme)
      this.addDependency(theme)
    })
  }
  console.log('loader', themeModules)

  return `
    module.exports.themes = [
      ${themeModules.map(filename => `require('${filename}').default`)}
    ]
  `
}
