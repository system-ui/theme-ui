import React from 'react'
import { ThemeProvider } from 'theme-ui'

const theme = require('../.cache/theme.js').default

export const wrapRootElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  )
}
