const fs = require('fs')
const path = require('path')

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
