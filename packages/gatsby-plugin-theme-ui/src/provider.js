/** @jsx jsx */
import { jsx, ThemeProvider, merge } from 'theme-ui'
import theme from './index'
import components from './components'
import useThemeUiConfig from './hooks/configOptions'

const Root = ({ children }) => {
  const themeUiConfig = useThemeUiConfig()
  const { prismPreset } = themeUiConfig

  const themeWithPrism = merge(
    {},
    {
      styles: {
        pre: prismPreset,
      },
    }
  )

  const fullTheme = merge(themeWithPrism, theme)

  return (
    <ThemeProvider theme={fullTheme} components={components}>
      {children}
    </ThemeProvider>
  )
}

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>
}
