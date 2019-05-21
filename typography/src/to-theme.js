// POC/custom implementation of typography.js for use in theme-ui
// import assign from 'object-assign'
import verticalRhythm from 'compass-vertical-rhythm'
import ms from 'modularscale'
import styles from './styles'

// - uses unitless values
// - creates base theme object
// - creates theme.styles object for consumption in theme-ui
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
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
  bodyFontFamily: ["georgia", "serif"],
  headerWeight: "bold",
  bodyWeight: "normal",
  boldWeight: "bold",
  includeNormalize: true,
  blockMarginBottom: 1,
}

const REG = {
  PX: /px$/,
  EM: /r?em$/,
  PC: /%$/,
}
export const toUnitless = val => {
  // todo: create configs that use non-pixel units
  // if (typeof val === 'number') return val
  // if (!REG.PX.test(val)) return val
  // if (REG.EM.test(val)) {
  //   const em = parseFloat(val)
  //   return em * 16
  // }
  // console.log('UNHANDLED UNIT', val)

  return parseFloat(val)
}

export const getScale = opts => value => {
  // todo: how is this used?
  // 1. used to create h1-h6 styles
  // 2. lineHeight is *not* used??
  const fontSize = ms(value, opts.scaleRatio) * opts.baseFontSize
  // const lineHeight = vr.rhythm(1, opts.baseFontSize)
  return {
    fontSize,
    // lineHeight,
  }
}

export const getSpace = (result, opts) => {
  const n = toUnitless(result.rhythm(opts.blockMarginBottom))
  return [ 0, 1/4, 1/2, 1, 2, 4, 8 ].map(v => v * n)
}

const stackFonts = fonts => fonts.map(font => `"${font}"`).join(', ')

export const getFonts = (result, opts) => {
  const body = stackFonts(opts.bodyFontFamily)
  const heading = stackFonts(opts.headerFontFamily)
  return {
    body,
    heading,
  }
}

export const getFontSizes = (result, opts) => {
  return [
    -1.5 / 5,
    -1 / 5,
    0,
    2 / 5,
    3 / 5,
    1
  ].map(result.scale).map(n => n.fontSize)
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

  typo.scale = getScale(opts)

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
