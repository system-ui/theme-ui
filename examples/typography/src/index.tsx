import { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'

import theme from './theme'

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
