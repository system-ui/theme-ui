/** @jsx jsx */

import { Global } from '@emotion/core'
import React, { memo } from 'react'
import { jsx, useThemeUI, ThemeProvider, Styled } from 'theme-ui'
import { base } from '@theme-ui/presets'

const CustomThemeProvider = memo(({ children, ...props }) => (
  <ThemeProvider theme={base} {...props}>
    <Styled.root>{children}</Styled.root>
  </ThemeProvider>
))

const Reset = () =>
  React.createElement(Global, {
    styles: {
      body: {
        margin: '0',
      },
    },
  })

export { useThemeUI as useTheme, Reset, CustomThemeProvider as default }
