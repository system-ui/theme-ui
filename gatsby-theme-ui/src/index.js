import React from 'react'
import { ThemeProvider } from 'theme-ui'
import components from './components'
import theme from './theme'

const Root = props => {
  return (
    <ThemeProvider
      components={components}
      theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export const wrapRootElement = ({ element, props }) =>
  <Root>
    {element}
  </Root>
