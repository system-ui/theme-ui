/** @jsxImportSource theme-ui */
import { ThemeUIProvider } from 'theme-ui'
import { theme } from './theme'

export const App = () => (
  <ThemeUIProvider theme={theme}>
    <h1
      sx={{
        color: 'primary',
        fontFamily: 'heading',
      }}
    >
      Hello
    </h1>
  </ThemeUIProvider>
)
