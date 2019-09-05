/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  ThemeStateProvider,
  ColorMode,
} from 'theme-ui'
import React from 'react'
import theme from './index'
import components from './components'

export const wrapRootElement = ({ element }) =>
  jsx(ThemeStateProvider, { theme },
    jsx(ThemeProvider, {
        components,
      },
      theme.initialColorMode &&
        jsx(ColorMode, {
          key: 'theme-ui-color-mode',
        }),
      React.cloneElement(element, { key: 'element' })
    )
  )
