import fs from 'fs'
import path from 'path'
import pkg from './package.json'
// const fs = require('fs')
// const path = require('path')
// const pkg = require('./package.json')

const themeModules = []

export const onCreateWebpackConfig = ({ actions, loaders, store }, opts) => {
  const { program, config, themes } = store.getState()

  const siteThemeFilename = path.join(program.directory, 'src', 'theme.js')

  if (Array.isArray(themes.themes)) {
    themes.themes.forEach(theme => {
      let hasThemePlugin = false
      if (theme.themeConfig && theme.themeConfig.plugins) {
        hasThemePlugin = theme.themeConfig.plugins.includes(pkg.name)
      }
      if (hasThemePlugin) {
        const filepath = path.join(theme.themeDir, 'src', 'theme.js')
        if (fs.existsSync(filepath)) {
          themeModules.push(filepath)
        }
      }
    })
  }

  if (fs.existsSync(siteThemeFilename)) {
    themeModules.push(siteThemeFilename)
  }
  console.log('create webpack config', themeModules)

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui')) },
        {
          test: /gatsby-plugin-theme-ui\/loader/,
          use: [
            loaders.js(),
            {
              loader: require.resolve('./loader'),
              options: {
                ...opts,
                config,
                themes: themeModules,
              }
            }
          ]
        }
      ]
    }
  })
}
