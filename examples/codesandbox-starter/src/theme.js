/** @jsx jsx */

import { Global } from '@emotion/react'
import React, { memo } from 'react'
import { jsx, useThemeUI, ThemeProvider, Themed } from 'theme-ui'
import { base } from '@theme-ui/presets'

const CustomThemeProvider = memo(({ children, ...props }) => (
  <ThemeProvider theme={base} {...props}>
    <Themed.root>{children}</Themed.root>
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
