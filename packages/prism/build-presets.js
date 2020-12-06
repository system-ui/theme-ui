const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssJS = require('postcss-js')
const { paramCase } = require('param-case')

const dir = {
  prismjs: path.join(path.dirname(require.resolve('prismjs')), 'themes'),
}

const RE = {
  ignore: /^(pre|code|@media|\:not)/,
}

// hard-coded because prismjs css selectors
const baseStyles = {
  'prism-coy.css': {
    color: 'black',
    backgroundColor: '#fdfdfd',
  },
  'prism-dark.css': {
    color: 'white',
    backgroundColor: 'hsl(30, 20%, 25%)',
  },
  'prism-funky.css': {
    color: 'white',
    backgroundColor: 'black',
  },
  'prism-okaidia.css': {
    color: '#f8f8f2',
    backgroundColor: '#272822',
  },
  'prism-solarizedlight.css': {
    color: '#657b83',
    backgroundColor: '#073642',
  },
  'prism-tomorrow.css': {
    color: '#ccc',
    backgroundColor: '#2d2d2d',
  },
  'prism-twilight.css': {
    color: 'white',
    backgroundColor: 'hsl(0, 0%, 8%)',
  },
  'prism.css': {
    color: 'black',
    backgroundColor: '#f5f2f0',
  },
}
const createStyles = (name, obj) => {
  let next = baseStyles[name] || {}
  Object.entries(obj).forEach(([key, value]) => {
    if (RE.ignore.test(key)) return
    const cleanKey = key.replace(/\n/g, '').replace(/\.token/g, '')
    next[cleanKey] = value
  })
  return next
}

const cleanName = (str) => str.replace(/\.css$/, '')

const prism = [
  'prism-coy.css',
  'prism-dark.css',
  'prism-funky.css',
  'prism-okaidia.css',
  'prism-solarizedlight.css',
  'prism-tomorrow.css',
  'prism-twilight.css',
  'prism.css',
].map((name) => {
  const filename = path.join(dir.prismjs, name)
  const content = fs.readFileSync(filename, 'utf8')
  const tree = postcss.parse(content)
  const raw = postcssJS.objectify(tree)
  const styles = createStyles(name, raw)
  return {
    name: cleanName(name),
    filename,
    content,
    styles,
  }
})

const prismReactToStyles = (obj) => {
  let styles = {
    ...obj.plain,
  }
  obj.styles.forEach((s) => {
    const selector = s.types.map((t) => '.' + t).join(',')
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
].map((name) => {
  const raw = require('prism-react-renderer/themes/' + name)
  const styles = prismReactToStyles(raw)
  return {
    name: paramCase(name),
    raw,
    styles,
  }
})

const presets = [...prism, ...reactPrism]
presets.forEach((preset) => {
  const outfile = path.join(__dirname, 'presets', preset.name + '.json')
  const json = JSON.stringify(preset.styles, null, 2)
  fs.writeFileSync(outfile, json)
})
