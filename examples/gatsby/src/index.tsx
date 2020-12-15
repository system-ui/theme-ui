import React, { FC, ReactNode } from 'react'
import { ThemeProvider, Themed } from 'theme-ui'
import theme from './theme'

export const wrapRootElement: FC<{ element: ReactNode }> = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Themed.root>{element}</Themed.root>
  </ThemeProvider>
)
