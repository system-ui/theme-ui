require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
})

const fs = require('fs')
const path = require('path')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const Logo = require('../src/components/logo').default
const OGImage = require('../src/components/og-image').default

const h = React.createElement

const dirname = path.join(__dirname, '..', 'static')
const files = {}
const svg = {}

files.logo = path.join(dirname, 'logo.svg')
files.card = path.join(dirname, 'card.svg')

svg.logo = renderToStaticMarkup(h(Logo))
svg.card = renderToStaticMarkup(h(OGImage))

fs.writeFileSync(files.logo, svg.logo)
fs.writeFileSync(files.card, svg.card)

console.log('SVG logo saved')
