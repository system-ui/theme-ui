import { jsx, type ThemeUIStyleObject } from '@theme-ui/core'
import { css, type Theme } from '@theme-ui/css'
import { Global as EmotionGlobal } from '@emotion/react'

const Global = ({ styles }: { styles: ThemeUIStyleObject }) =>
  jsx(EmotionGlobal, {
    styles: (emotionTheme: unknown) => {
      const theme = emotionTheme as Theme
      return css(styles)(theme)
    },
  })

export default Global
