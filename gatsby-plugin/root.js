const { jsx, ThemeProvider, ColorMode } = require('theme-ui')
const merge = require('lodash.merge')
const { themes } = require('gatsby-plugin-theme-ui/loader')

const theme = merge({}, ...themes)

console.log(themes, theme)

module.exports = ({ element }, opts) => {
  return jsx(ThemeProvider, {
    ...opts,
    theme,
  },
    theme.initialColorMode && jsx(ColorMode, {
      key: 'theme-ui-color-mode',
    }),
    element
  )
}
