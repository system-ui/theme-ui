/**
 * @jest-environment jsdom
 */

import 'babel-polyfill'

import fs from 'fs'
import path from 'path'
import execa from 'execa'

import toTailwind from '../src'

const theme = {
  breakpoints: ['30em', '45em', '55em', '75em'],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#05a',
    accent: '#609',
    muted: '#f6f6f6',
    white: '#fff',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  space: ['0', '4px', '8px', '16px', '32px', '64px'],
  size: ['10em', '20em', '30em', '40em'],
  letterSpacing: ['-0.04em', '0', '0.04em'],
  shadows: ['0 0 2px rgba(0,0,0,0.125)', '0 0 8px rgba(0,0,0,0.25)'],
}

const toJS = (theme: { [Key: string]: unknown }) => `
module.exports = ${JSON.stringify(theme, null, 2)}
`

jest.setTimeout(15000)

it('transforms a theme config to a Tailwind config', () => {
  const result = toTailwind(theme)

  expect(result).toMatchSnapshot()
})

it('does not error when using the Tailwind CLI', async () => {
  expect.assertions(1)
  const filePath = path.join(__dirname, 'tailwind.config.js')
  const contentFilename = path.join(__dirname, 'index.html')
  fs.writeFileSync(
    filePath,
    toJS(toTailwind(theme, { content: [contentFilename] }))
  )
  // , { content: [contentFilename] }))

  const fixtureFilename = path.join(__dirname, 'fixture.css')
  const outputFilename = path.join(__dirname, 'out.css')

  await execa(
    '../node_modules/.bin/tailwind',
    ['build', '-i', fixtureFilename, '-o', outputFilename],
    { cwd: __dirname }
  )

  const result = fs.readFileSync(outputFilename, 'utf8')

  expect(result).toMatchSnapshot()
})
