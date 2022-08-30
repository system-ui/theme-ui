import { Interpolation } from '@emotion/react'
import { ThemeUIStyleObject, Theme as ThemeUITheme } from '@theme-ui/css'

export interface SxProp {
  /**
   * The sx prop lets you style elements inline, using values from your
   * theme.
   *
   * @see https://theme-ui.com/sx-prop/
   */
  sx?: ThemeUIStyleObject
  /**
   * Theme UI uses Emotion's JSX function. You can pass styles to it directly
   * using `css` prop.
   * @see https://theme-ui.com/sx-prop/#raw-css
   */
  css?: Interpolation<ThemeUITheme>
}
