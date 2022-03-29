import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

export const WrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
