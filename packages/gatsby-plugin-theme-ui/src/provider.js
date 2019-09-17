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

const hasColorModes = t => t.colors && t.colors.modes && Object.keys(t.colors.modes).length

export const wrapRootElement = ({ element }) =>
  jsx(ThemeStateProvider, { theme },
    jsx(ThemeProvider, {
        components,
      },
      hasColorModes(theme) &&
        jsx(ColorMode, {
          key: 'theme-ui-color-mode',
        }),
      React.cloneElement(element, { key: 'element' })
    )
  )
