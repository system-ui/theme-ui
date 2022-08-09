import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import theme from './theme'

export const WrapRootElement: FC<{ element: ReactNode }> = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Themed.root>{element}</Themed.root>
  </ThemeProvider>
)
