const {
  jsx,
  ThemeProvider,
  ColorMode,
} = require('theme-ui')
const merge = require('lodash.merge')
const loader = require('gatsby-plugin-theme-ui/loader')
const { themes } = require('gatsby-plugin-theme-ui/loader')

const theme = merge({}, ...themes)

console.log(themes)
console.log('typeof loader', typeof loader, loader)

module.exports = ({ element }, opts) => {
  console.log('ThemeProvider', theme)
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
