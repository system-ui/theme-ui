const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssJS = require('postcss-js')

const dir = {
  prismjs: path.join(path.dirname(require.resolve('prismjs')), 'themes'),
}

const ignore = /^(pre|code|@media|\:not)/
const cleanObject = obj => {
  let next = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (ignore.test(key)) return
    const cleanKey = key.replace(/\n/g, '').replace(/\.token/g, '')

    next[cleanKey] = value
  })
  return next
}

const cleanName = str => str.replace(/\.css$/, '')

const prism = [
  'prism-coy.css',
  'prism-dark.css',
  'prism-funky.css',
  'prism-okaidia.css',
  'prism-solarizedlight.css',
  'prism-tomorrow.css',
  'prism-twilight.css',
  'prism.css',
].map(name => {
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

const prismReactToStyles = obj => {
  let styles = {
    ...obj.plain,
  }
  obj.styles.forEach(s => {
    const selector = s.types.map(t => '.' + t).join(',')
    styles[selector] = s.style
  })
  return styles
}

const reactPrism = [
  'dracula',
  'duotoneDark',
  'duotoneLight',
  'nightOwl',
  'nightOwlLight',
  'oceanicNext',
  'ultramin',
  'github',
  'shadesOfPurple',
  'vsDark',
].map(name => {
  const raw = require('prism-react-renderer/themes/' + name)
  const styles = prismReactToStyles(raw)
  return {
    name,
    raw,
    styles,
  }
})

const presets = [...prism, ...reactPrism]
presets.forEach(preset => {
  const outfile = path.join(__dirname, 'presets', preset.name + '.json')
  const json = JSON.stringify(preset.styles, null, 2)
  fs.writeFileSync(outfile, json)
})
