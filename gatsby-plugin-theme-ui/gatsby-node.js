const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')

const themeModules = []

const hasModule = dirname => {
  return fs.existsSync(path.join(dirname, 'src', 'theme.js'))
    || fs.existsSync(path.join(dirname, 'src', 'theme', 'index.js'))
}

exports.onCreateWebpackConfig = ({ actions, loaders, store }, opts) => {
  const { program, config, themes } = store.getState()
  const siteThemeModule = path.join(program.directory, 'src', 'theme')

  if (Array.isArray(themes.themes)) {
    themes.themes.forEach(theme => {
      let hasThemePlugin = false
      if (theme.themeConfig && theme.themeConfig.plugins) {
        hasThemePlugin = theme.themeConfig.plugins.includes(pkg.name)
      }
      if (hasThemePlugin) {
        const filepath = path.join(theme.themeDir, 'src', 'theme.js')
        if (hasModule(theme.themeDir)) {
          themeModules.push(filepath)
        }
      }
    })
  }

  if (hasModule(program.directory)) {
    themeModules.push(siteThemeModule)
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui'))
        },
        {
          test: /gatsby-plugin-theme-ui\/loader/,
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui')),
          use: [
            loaders.js(),
            {
              loader: require.resolve('./loader'),
              options: {
                ...opts,
                themes: themeModules,
              }
            }
          ]
        }
      ]
    }
  })
}
