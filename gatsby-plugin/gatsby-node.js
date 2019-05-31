const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')

const themeModules = []

exports.onCreateWebpackConfig = ({ actions, loaders, store }, opts) => {
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
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui'))
        },
        {
          test: /\.\/loader\.js$/,
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui')),
          use: [
            loaders.js(),
            {
              loader: require.resolve('./loader'),
              options: {
                themes: themeModules,
              }
            }
          ]
        }
      ]
    }
  })
}
