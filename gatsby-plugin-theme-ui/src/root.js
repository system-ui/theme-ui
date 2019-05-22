import React from 'react'
import { ThemeProvider } from 'theme-ui'

let theme = {}

try {
  theme = require(THEME_UI_PATH)
  console.log(theme)
} catch (e) {
  console.error(e)
}

export const wrapRootElement = ({ element, props }) =>
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
