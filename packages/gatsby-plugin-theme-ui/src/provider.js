/** @jsx jsx */
import { jsx, ThemeProvider, merge } from 'theme-ui'
import theme from './index'
import components from './components'
import useThemeUiConfig from './hooks/configOptions'

const Root = ({ children }) => {
  const themeUiConfig = useThemeUiConfig()
  const { themePreset } = themeUiConfig

  const theme = themePreset.default || themePreset

  const fullTheme = merge(theme, localTheme)

  return (
    <ThemeProvider theme={fullTheme} components={components}>
      {children}
    </ThemeProvider>
  )
}

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>
}
