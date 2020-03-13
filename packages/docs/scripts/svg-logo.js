require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
})

const fs = require('fs')
const path = require('path')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const Logo = require('../src/components/logo').default

const h = React.createElement

const svg = renderToStaticMarkup(h(Logo))
const filename = path.join(__dirname, '..', 'static', 'logo.svg')
fs.writeFileSync(filename, svg)

console.log('SVG logo saved')
