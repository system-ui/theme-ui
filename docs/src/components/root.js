/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import theme from './theme'

export default props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}
