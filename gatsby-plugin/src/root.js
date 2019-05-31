import { jsx, ThemeProvider, ColorMode } from 'theme-ui'
import merge from 'lodash.merge'
import { themes } from 'gatsby-plugin-theme-ui/loader'

const theme = merge({}, ...themes)

console.log(themes)

export const wrapRootElement = ({ element }, opts) => {
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
