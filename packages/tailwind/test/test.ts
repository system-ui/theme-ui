import 'babel-polyfill'

import fs from 'fs'
import path from 'path'
import execa from 'execa'

import toTailwind from '../src'

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#05a',
    accent: '#609',
    muted: '#f6f6f6f',
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
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
  space: [0, 2, 3, 4, 5, 6],
  size: ['10em', '20em', '30em', '40em'],
}

const toJS = (theme: { [Key: string]: unknown }) => `
module.exports = ${JSON.stringify(theme, null, 2)}
`

jest.setTimeout(10000)

it('transforms a theme config to a Tailwind config', () => {
  const result = toTailwind(theme)

  expect(result).toMatchSnapshot()
})

it('does not error when using the Tailwind CLI', async () => {
  expect.assertions(1)
  const filePath = path.join(__dirname, 'tailwind.config.js')
  fs.writeFileSync(filePath, toJS(toTailwind(theme)))

  const fixtureFilename = path.join(__dirname, 'fixture.css')
  const outputFilename = path.join(__dirname, 'out.css')

  await execa(
    '../node_modules/.bin/tailwind',
    ['build', fixtureFilename, '-o', outputFilename],
    { cwd: __dirname }
  )

  const result = fs.readFileSync(outputFilename, 'utf8')

  expect(result).toMatchSnapshot()
})
