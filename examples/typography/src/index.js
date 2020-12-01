import React from 'react'
import { ThemeProvider, Themed } from 'theme-ui'
import theme from './theme'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Themed.root>{element}</Themed.root>
  </ThemeProvider>
)
