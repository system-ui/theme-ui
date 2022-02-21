import * as React from "react"
import { ThemeProvider, Themed } from 'theme-ui'
import theme from './theme'

export const WrapRootElement: React.FC<{ element: React.ReactNode }> = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Themed.root>{element}</Themed.root>
  </ThemeProvider>
)
