/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  ColorMode
} from 'theme-ui'
import theme from './index'
import components from './components'

export const wrapRootElement = ({ element }, opts) =>
  console.log('gatsby-theme-ui root', theme) ||
  jsx(ThemeProvider, {
    theme,
    components,
  },
    theme.initialColorMode && jsx(ColorMode, {
      key: 'theme-ui-color-mode',
    }),
    element,
  )
