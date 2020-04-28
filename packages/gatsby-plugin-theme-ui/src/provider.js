/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  merge
} from 'theme-ui'
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

  themeWrapper = merge(themeWrapper, {
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

