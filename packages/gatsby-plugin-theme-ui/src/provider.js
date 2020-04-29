/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  merge
} from 'theme-ui'
import { toTheme } from '@theme-ui/typography'
import theme from './index'
import components from './components'
import useThemeUiConfig from './hooks/configOptions'


const Root = ({children}) => {
  const themeUiConfig = useThemeUiConfig()
  const {themeModule, themeModulePath, moduleExportName} = themeUiConfig

  let themeWrapper
  if (themeModule) {
    themeWrapper = themeModule
  }

  if (themeModulePath) {
    themeWrapper = themeModulePath
  }
  
  if(themeWrapper && (moduleExportName in themeWrapper)) {
    themeWrapper = themeWrapper[moduleExportName]
  }

  let typography = {}
  if (typographyTheme) {
    typography = toTheme(typographyTheme.default)
  }

  themeWrapper = merge(themeWrapper, {
    ...typography,
    ...theme
  })
  return (
    <ThemeProvider theme={themeWrapper} components={components}>
    {children}
    </ThemeProvider>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <Root>{element}</Root>
  )
}

