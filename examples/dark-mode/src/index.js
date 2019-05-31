import React from 'react'
import { ColorModeProvider, ThemeProvider, Styled } from 'theme-ui'
import theme from './theme'

export const wrapRootElement = ({ element }) =>
  <ColorModeProvider initialColorMode='light'>
    <ThemeProvider theme={theme}>
      <Styled.root>
        {element}
      </Styled.root>
    </ThemeProvider>
  </ColorModeProvider>
