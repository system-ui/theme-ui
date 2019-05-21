// POC/custom implementation of typography.js for use in theme-ui
import verticalRhythm from 'compass-vertical-rhythm'
import ms from 'modularscale'

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
