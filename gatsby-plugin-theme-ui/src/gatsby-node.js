const fs = require('fs')
const path = require('path')

/*
exports.onPreBootstrap = ({ store }, opts) => {
  const { program } = store.getState()
  let module
  if (opts.theme) {
    const filepath = opts.theme
    const dirname = path.join(__dirname, '.cache')
    module = `module.exports = require('${filepath}')`

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname)
    }

    fs.writeFileSync(path.join(dirname, 'theme.js'), module)
  }
}
*/

const instances = []

exports.onPreInit = ({ store }, opts) => {
  if (!opts.theme) return
  console.log(opts)
  const { program } = store.getState()
  console.log(program.directory)
  const filepath = path.isAbsolute(opts.theme)
    ? opts.theme
    : path.join(program.directory, opts.theme)

  // only run once
  if (instances.includes(filepath)) return
  if (instances.length) return

  instances.push(filepath)
}

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  console.log('create webpack config', instances)
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
      // THEME_UI_PATHS
        BEEP: JSON.stringify('boop'),
        THEME_UI_PATH: JSON.stringify(instances[0]),
        GATSBY_THEME_UI_PATHS: JSON.stringify(instances),
      }),
    ],
  })
}
