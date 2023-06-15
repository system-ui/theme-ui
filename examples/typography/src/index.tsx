import { ReactNode } from 'react'
import { ThemeUIProvider } from 'theme-ui'

import theme from './theme'

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <ThemeUIProvider theme={theme}>{element}</ThemeUIProvider>
)
