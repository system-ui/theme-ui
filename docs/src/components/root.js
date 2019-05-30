/** @jsx jsx */
import {
  jsx,
  ColorMode,
  ThemeProvider
} from 'theme-ui'
import theme from './theme'
import components from './mdx-components'

export default props => {
  return (
    <ThemeProvider
      initialColorMode='light'
      components={components}
      theme={theme}>
      <ColorMode />
      {props.children}
    </ThemeProvider>
  )
}
