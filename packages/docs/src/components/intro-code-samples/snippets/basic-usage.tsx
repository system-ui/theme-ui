/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'
import { theme } from './theme'

export const App = () => (
  <ThemeProvider theme={theme}>
    <h1
      sx={{
        color: 'primary',
        fontFamily: 'heading',
      }}>
      Hello
    </h1>
  </ThemeProvider>
)
