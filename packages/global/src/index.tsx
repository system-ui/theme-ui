import { jsx, type ThemeUIStyleObject } from '@theme-ui/core'
import { css, type Theme } from '@theme-ui/css'
import { Global as EmotionGlobal } from '@emotion/react'

export interface GlobalProps {
  styles: ThemeUIStyleObject
}
const Global = ({ styles }: GlobalProps): JSX.Element =>
  jsx(EmotionGlobal, {
    styles: (emotionTheme: unknown) => {
      const theme = emotionTheme as Theme
      return css(styles)(theme)
    },
  })

export default Global
