// @ts-check
import themeUICustomProperties from '..'
import mockConsole from 'jest-mock-console'

const toCustomProperties = /** @type {{ default: import('..').default }} */ (
  /** @type {any} */ (themeUICustomProperties)
).default

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#05a',
    accent: '#609',
    muted: '#f6f6f6',
    dark: {
      foreground: {
        text: '#000',
      },
      background: {
        surface: '#fff',
      },
    },
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
  lineHeights: [1.5, 1.125],
  space: [0, 2, 3, 4, 5, 6],
  size: ['10em', '20em', '30em', '40em'],
  radii: {
    s: '0.125em',
    m: '0.25em',
    l: '0.5em',
  },
}

it('transforms a theme config to CSS custom properties', () => {
  mockConsole()
  const result = toCustomProperties(theme)

  expect(result).toMatchSnapshot()
  expect(console.warn).toHaveBeenCalledTimes(0)
})

it('transforms a theme config to CSS custom properties with prefix', () => {
  const result = toCustomProperties(theme, '🍭')

  expect(result).toMatchSnapshot()
})

it('warns on invalid CSS custom property key', () => {
  mockConsole()
  toCustomProperties({ sizes: { '1/4': 1 / 4, '1/2': 1 / 2 } })

  expect(console.warn).toHaveBeenCalledTimes(2)
  expect(console.warn).toHaveBeenLastCalledWith(
    '[theme-ui] Theme key "0.5" found will produce an invalid CSS custom property. Keys must only contain the following: A-Z, a-z, 0-9, hyphen, underscore.'
  )
})
