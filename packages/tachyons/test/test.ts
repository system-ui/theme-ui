import 'babel-polyfill'

import tachyonsGenerator from 'tachyons-generator'
import mockConsole from 'jest-mock-console'
import toTachyons from '../src'

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#05a',
    accent: '#609',
    muted: '#f6f6f6',
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
  lineHeights: [1.5, 1.125],
  space: [0, 2, 3, 4, 5, 6],
  size: ['10em', '20em', '30em', '40em'],
}

it('transforms a theme config to a Tachyons config', () => {
  const result = toTachyons(theme)

  expect(result).toMatchSnapshot()
})

it('generates the proper config for the Tachyons generator', async () => {
  // ignore warnings
  const restore = mockConsole()
  const { css: result } = await tachyonsGenerator(toTachyons(theme)).generate()

  expect(result).toMatchSnapshot()
  restore()
})
