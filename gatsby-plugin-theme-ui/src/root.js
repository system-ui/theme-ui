import React from 'react'
import { ThemeProvider } from 'theme-ui'
import merge from 'lodash.merge'
import { themes } from './theme-loader.js'

const theme = merge({}, ...themes)

export const wrapRootElement = ({ element, props }) =>
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
