/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import theme from './theme'
import components from './mdx-components'

export default props => {
  return (
    <ThemeProvider
      components={components}
      theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}
