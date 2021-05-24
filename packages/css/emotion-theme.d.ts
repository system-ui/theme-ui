import '@emotion/react'

import { Theme } from '@theme-ui/css'

// TODO: This file is not include in user's project anyway.
// Consider removing it and advising to inject their exact theme into Emotion.
interface ThemeUITheme extends Theme {}

declare module '@emotion/react' {
  export interface Theme extends ThemeUITheme {}
}
