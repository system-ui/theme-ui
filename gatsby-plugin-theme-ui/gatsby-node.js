const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

exports.onCreateWebpackConfig = ({ actions, loaders, cache }) => {
  console.log('add webpack loader')
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
}

exports.onPostBootstrap = ({ cache }, opts) => {
  if (!opts.theme) return
  const filename = path.join(cache.directory, 'themes.json')
  try {
    const themes = require(filename)
    themes.push(opts.theme)
    console.log('added', themes)
    fs.writeFileSync(filename, JSON.stringify(themes))
  } catch (e) {
    console.error(e)
  }
}
