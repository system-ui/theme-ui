import {
  jsx,
  type ThemeUIStyleObject,
  type Theme as CoreTheme,
} from '@theme-ui/core'
import { css, type Theme as GeneralTheme } from '@theme-ui/css'
import { Global as EmotionGlobal } from '@emotion/react'

export interface GlobalProps {
  styles: ThemeUIStyleObject<CoreTheme>
}
const Global = ({ styles }: GlobalProps): JSX.Element =>
  jsx(EmotionGlobal, {
    styles: (emotionTheme: unknown) => {
      const theme = emotionTheme as GeneralTheme
      return css(styles)(theme)
    },
  })

export default Global
