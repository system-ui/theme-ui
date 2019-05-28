const path = require('path')
const { getOptions } = require('loader-utils')

const themeModules = []
const componentModules = []

module.exports = function () {
  const opts = getOptions(this)

  if (opts.theme) {
    themeModules.push(opts.theme)
    this.addDependency(opts.theme)
  }

  if (opts.components) {
    componentModules.push(opts.components)
    this.addDependency(opts.components)
  }


  return `
    export const themes = [
      ${themeModules.map(filename => `require('${filename}').default`)}
    ]

    export const components = [
      ${componentModules.map(filename => `require('${filename}').default`)}
    ]
  `
}
