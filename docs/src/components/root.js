/** @jsx jsx */
import { jsx, ColorModeProvider, ThemeProvider } from 'theme-ui'
import theme from './theme'
import components from './mdx-components'

export default props => {
  return (
    <ColorModeProvider initialColorMode='light'>
      <ThemeProvider
        components={components}
        theme={theme}>
        {props.children}
      </ThemeProvider>
    </ColorModeProvider>
  )
}
