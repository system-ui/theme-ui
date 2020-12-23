import '@emotion/react'

import { Theme } from '@theme-ui/css'

interface ThemeUITheme extends Theme {}

declare module '@emotion/react' {
  export interface Theme extends ThemeUITheme {}
}
