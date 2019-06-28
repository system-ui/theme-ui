/** @jsx jsx */

import { Global } from '@emotion/core'
import React, { memo } from 'react'
import { jsx, useThemeUI, ThemeProvider as TP, Styled } from 'theme-ui'
import { base } from '@theme-ui/presets'

const ThemeProvider = memo(({ children, ...props }) => (
  <TP theme={base} {...props}>
    <Styled.root>{children}</Styled.root>
  </TP>
))

const Reset = () =>
  React.createElement(Global, {
    styles: {
      body: {
        margin: '0',
      },
      'h1, h2, h3, h4, h5, h6': {
        margin: 0,
      },
      small: {
        fontSize: '100%',
      },
      a: {
        textDecoration: 'none',
      },
      button: {
        border: 0,
        padding: 0,
        fontSize: '100%',
        backgroundColor: 'transparent',
      },
    },
  })

export { useThemeUI as useTheme, Reset, ThemeProvider as default }
