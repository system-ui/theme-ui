/** @jsx jsx */
import { jsx, ThemeProvider, ColorMode } from 'theme-ui'
import React from 'react'
import theme from './index'
import components from './components'

export const wrapRootElement = ({ element }) =>
  jsx(
    ThemeProvider,
    {
      theme,
      components,
    },
    theme.initialColorMode &&
      jsx(ColorMode, {
        key: 'theme-ui-color-mode',
      }),
    React.cloneElement(element, { key: 'element' })
  )
