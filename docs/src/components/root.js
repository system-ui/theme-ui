/** @jsx jsx */
import {
  jsx,
  ColorModeProvider,
  ColorMode,
  ThemeProvider
} from 'theme-ui'
import theme from './theme'
import components from './mdx-components'

export default props => {
  return (
    <ColorModeProvider initialColorMode='light'>
      <ThemeProvider
        components={components}
        theme={theme}>
        <ColorMode />
        {props.children}
      </ThemeProvider>
    </ColorModeProvider>
  )
}
