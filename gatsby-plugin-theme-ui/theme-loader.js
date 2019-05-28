const path = require('path')
const { getOptions } = require('loader-utils')
const pkg = require('./package.json')

const themeModules = []

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

  return `
    export const themes = [
      ${themeModules.map(filename => `require('${filename}').default`)}
    ]

    export const components = []
  `
}
