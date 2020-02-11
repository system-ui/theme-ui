/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
} from 'theme-ui'
import theme from './index'
import components from './components'

export const wrapRootElement = ({ element }) =>
  jsx(ThemeProvider, {
      theme,
      components,
    },
    element,
  )
