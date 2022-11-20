import React from 'react'
import { jsx, type ThemeUIStyleObject } from '@theme-ui/core'
import { css, type Theme } from '@theme-ui/css'
import { Global as EmotionGlobal } from '@emotion/react'

const Global = ({ sx }: { sx: ThemeUIStyleObject }) =>
  jsx(EmotionGlobal, {
    styles: (emotionTheme: unknown) => {
      const theme = emotionTheme as Theme
      return css(sx)(theme)
    },
  })

export default Global
