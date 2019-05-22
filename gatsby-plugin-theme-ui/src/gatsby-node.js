const fs = require('fs')
const path = require('path')

let filepath

exports.onPreInit = ({ store }, opts) => {
  if (!opts.theme) return
  const { program } = store.getState()
  filepath = path.isAbsolute(opts.theme)
    ? opts.theme
    : path.join(program.directory, opts.theme)
}

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  console.log('create webpack config', filepath)
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        THEME_UI_PATH: JSON.stringify(filepath),
      }),
    ],
  })
}
