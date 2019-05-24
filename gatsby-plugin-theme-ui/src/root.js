import React from 'react'
import { ThemeProvider, ColorModeProvider } from 'theme-ui'
import merge from 'lodash.merge'
import { themes, components } from './theme-loader.js'

const theme = merge({}, ...themes)
const comps = merge({}, ...components)

export const wrapRootElement = ({ element, props }, opts) => {
  const children = (
    <ThemeProvider
      components={comps}
      theme={theme}>
      {element}
    </ThemeProvider>
  )

  if (!opts.colorMode) {
    return children
  }

  return (
    <ColorModeProvider initialColorMode={opts.colorMode}>
      {children}
    </ColorModeProvider>
  )
}
