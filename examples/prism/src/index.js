import React from 'react'
import { ThemeUIProvider, Themed } from 'theme-ui'
import theme from './theme'

export const WrapRootElement = ({ element }) => (
  <ThemeUIProvider theme={theme}>
    <Themed.root>{element}</Themed.root>
  </ThemeUIProvider>
)
