const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssJS = require('postcss-js')

const dir = {
  prismjs: path.join(path.dirname(require.resolve('prismjs')), 'themes'),
}

const css = {
  prism: [
    'prism-coy.css',
    'prism-dark.css',
    'prism-funky.css',
    'prism-okaidia.css',
    'prism-solarizedlight.css',
    'prism-tomorrow.css',
    'prism-twilight.css',
    'prism.css',
  ],
}

const ignore = /^(pre|code|@media|\:not)/
const cleanObject = obj => {
  let next = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (ignore.test(key)) return
    next[key] = value
  })
  return next
}

const cleanName = str => str.replace(/\.css$/, '')

const contents = css.prism.map(name => {
  const filename = path.join(dir.prismjs, name)
  const content = fs.readFileSync(filename, 'utf8')
  const tree = postcss.parse(content)
  const raw = postcssJS.objectify(tree)
  const styles = cleanObject(raw)
  return {
    name: cleanName(name),
    filename,
    content,
    styles,
  }
})

contents.forEach(preset => {
  const outfile = path.join(__dirname, 'presets', preset.name + '.json')
  const json = JSON.stringify(preset.styles, null, 2)
  fs.writeFileSync(outfile, json)
})
