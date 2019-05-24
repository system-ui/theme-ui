const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

exports.onCreateWebpackConfig = ({ actions, loaders, cache }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui'))
        },
        {
          test: /theme-loader\.js$/,
          use: [
            loaders.js(),
            {
              loader: require.resolve('./theme-loader'),
              options: {
                dirname: cache.directory,
              }
            }
          ]
        }
      ]
    }
  })
}

exports.onPreBootstrap = ({ cache }) => {
  fs.writeFileSync(path.join(cache.directory, 'themes.json'), JSON.stringify([]))
  fs.writeFileSync(path.join(cache.directory, 'components.json'), JSON.stringify([]))
}

exports.onPostBootstrap = ({ cache }, opts) => {
  if (!opts.theme) return
  const themeFile = path.join(cache.directory, 'themes.json')
  const componentsFile = path.join(cache.directory, 'components.json')

  try {
    const themes = require(themeFile)
    themes.push(opts.theme)
    fs.writeFileSync(themeFile, JSON.stringify(themes))
  } catch (e) {
    console.error(e)
  }

  if (!opts.components) return

  try {
    const components = require(componentsFile)
    components.push(opts.components)
    fs.writeFileSync(componentsFile, JSON.stringify(components))
  } catch (e) {
    console.error(e)
  }
}
