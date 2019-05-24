import React from 'react'
import { ThemeProvider, ColorModeProvider } from 'theme-ui'
import merge from 'lodash.merge'
import { themes } from './theme-loader.js'

const theme = merge({}, ...themes)

export const wrapRootElement = ({ element, props }, opts) => {
  if (opts.colorMode) {
    <ColorModeProvider initialColorMode={opts.colorMode}>
      <ThemeProvider theme={theme}>
        {element}
      </ThemeProvider>
    </ColorModeProvider>
  }

  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  )
}
