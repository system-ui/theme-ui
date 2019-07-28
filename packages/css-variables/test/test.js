import 'babel-polyfill'

import toCssVariables from '../src'

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
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
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

it('transforms a theme config to css variables', () => {
  const result = toCssVariables(theme)

  expect(result).toMatchSnapshot()
})
