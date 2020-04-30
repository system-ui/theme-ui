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
  const {themeModule, themeModulePath} = themeUiConfig

  let themeWrapper
  if (themeModule) {
    themeWrapper = themeModule
  }

  if (themeModulePath) {
    themeWrapper = themeModulePath
  }
  
  if(themeWrapper && ('default' in themeWrapper)) {
    themeWrapper = themeWrapper.default
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

