/** @jsx jsx */
import { jsx, ColorModeProvider } from 'theme-ui'

export default props =>
  <ColorModeProvider initialColorMode='light'>
      {props.children}
  </ColorModeProvider>
