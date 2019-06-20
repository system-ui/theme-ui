import { toTheme, toUnitless } from '../src/to-theme'
import themes from './fixtures/themes'
import Typography from 'typography'

const typo = new Typography({
  ...themes.wp2016,
  baseFontSize: toUnitless(themes.wp2016.baseFontSize),
  rhythmUnit: 'px',
})
const styles = typo.toJSON()

test('converts typography.js theme to theme-ui', () => {
  const theme = toTheme(themes.wp2016)
  expect(typeof theme).toBe('object')
  expect(typeof theme.typography).toBe('object')
  expect(typeof theme.typography.options).toBe('object')
})

test('includes default options', () => {
  const theme = toTheme()
  expect(theme).toMatchSnapshot()
})

test('returns rhythm function', () => {
  const theme = toTheme(themes.wp2016)
  const values = [0, 1 / 4, 1 / 2, 3 / 4, 1, 2]
  const a = values.map(theme.typography.rhythm)
  const b = values.map(typo.rhythm)
  expect(typeof theme.typography.rhythm).toBe('function')
  expect(a).toEqual(b)
})

test('returns space scale', () => {
  const theme = toTheme(themes.wp2016)
  expect(Array.isArray(theme.space)).toBe(true)
  expect(theme.space[2]).toBe(toUnitless(typo.rhythm(1 / 2)))
  expect(theme.space[3]).toBe(toUnitless(typo.rhythm(1)))
})

test('returns fontSizes scale', () => {
  const theme = toTheme(themes.wp2016)
  expect(Array.isArray(theme.fontSizes)).toBe(true)
  expect(theme.fontSizes[0]).toBe(toUnitless(styles.h6.fontSize))
  expect(theme.fontSizes[2]).toBe(toUnitless(styles.h4.fontSize))
  expect(theme.fontSizes[4]).toBe(toUnitless(styles.h2.fontSize))
  expect(theme.fontSizes[5]).toBe(toUnitless(styles.h1.fontSize))
})

test('returns fonts', () => {
  const theme = toTheme(themes.wp2016)
  expect(typeof theme.fonts).toBe('object')
  expect(typeof theme.fonts.body).toBe('string')
  expect(typeof theme.fonts.heading).toBe('string')
})

test('returns font weights', () => {
  const theme = toTheme(themes.wp2016)
  expect(typeof theme.fontWeights).toBe('object')
  expect(typeof theme.fontWeights.body).toBe('number')
  expect(typeof theme.fontWeights.heading).toBe('number')
})

test('returns line heights', () => {
  const theme = toTheme(themes.wp2016)
  expect(typeof theme.lineHeights).toBe('object')
  expect(typeof theme.lineHeights.body).toBe('number')
  expect(typeof theme.lineHeights.heading).toBe('number')
})

const snapshots = Object.keys(themes).map(key => [key, themes[key]])

test.each(snapshots)('snapshot %s', (name, config) => {
  const theme = toTheme(config)
  expect(theme).toMatchSnapshot()
})
