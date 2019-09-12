// custom implementation of typography.js for use in theme-ui
import verticalRhythm from 'compass-vertical-rhythm'
import ms from 'modularscale'
import styles from './styles'

// - uses unitless values
// - creates base theme object
// - uses a static theme.styles object for consumption in theme-ui
// - ignores overrideThemeStyles
// - does not include color styles
// - should be mostly compatible with existing typography.js themes

const defaults = {
  baseFontSize: 16,
  baseLineHeight: 1.45,
  headerLineHeight: 1.1,
  scaleRatio: 2,
  googleFonts: [],
  headerFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
  bodyFontFamily: ['georgia', 'serif'],
  headerWeight: 'bold',
  bodyWeight: 'normal',
  boldWeight: 'bold',
  includeNormalize: true,
  blockMarginBottom: 1,
}

export const toUnitless = val => parseFloat(val)

export const getScale = opts => value =>
  ms(value, opts.scaleRatio) * opts.baseFontSize

export const getSpace = (result, opts) => {
  const n = toUnitless(result.rhythm(opts.blockMarginBottom))
  return [0, 1 / 4, 1 / 2, 1, 2, 4, 8].map(v => v * n)
}

// genericFontFamilies, wrapFontFamily adapted from typography.js
// Wrap font names in quotes, unless the font name is actually a keyword.
// See https://stackoverflow.com/a/13752149 and https://www.w3.org/TR/CSS2/fonts.html#font-family-prop
const genericFontFamilies = [
  'inherit',
  'default',
  'serif',
  'sans-serif',
  'monospace',
  'fantasy',
  'cursive',
  '-apple-system',
  'system-ui',
]

const wrapFontFamily = fontFamily =>
  genericFontFamilies.includes(fontFamily) ? fontFamily : `'${fontFamily}'`

const stackFonts = fonts => fonts.map(wrapFontFamily).join(', ')

export const getFonts = (result, opts) => {
  const body = stackFonts(opts.bodyFontFamily)
  const heading = stackFonts(opts.headerFontFamily)
  return {
    body,
    heading,
  }
}

export const getFontSizes = (result, opts) => {
  const scale = getScale(opts)
  return [-1.5 / 5, -1 / 5, 0, 2 / 5, 3 / 5, 1].map(scale)
}

export const getLineHeights = (result, opts) => {
  const body = opts.baseLineHeight
  const heading = opts.headerLineHeight
  return {
    body,
    heading,
  }
}

export const getFontWeights = (result, opts) => {
  const body = opts.bodyWeight
  const bold = opts.boldWeight
  const heading = opts.headerWeight
  return {
    body,
    bold,
    heading,
  }
}

export const toTheme = (_opts = {}) => {
  const opts = { ...defaults, ..._opts }
  // enforce unitless values
  opts.baseFontSize = toUnitless(opts.baseFontSize)
  opts.rhythmUnit = 'px'

  const typo = verticalRhythm(opts)
  const theme = {}
  typo.options = opts

  theme.space = getSpace(typo, opts)
  theme.fonts = getFonts(typo, opts)
  theme.fontSizes = getFontSizes(typo, opts)
  theme.fontWeights = getFontWeights(typo, opts)
  theme.lineHeights = getLineHeights(typo, opts)

  return {
    ...theme,
    styles,
    typography: typo,
  }
}

export default toTheme
