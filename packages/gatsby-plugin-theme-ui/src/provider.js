import { ThemeProvider, merge } from 'theme-ui'
import React from 'react'

import localTheme from './index'
import components from './components'
import useThemeUiConfig from './hooks/configOptions'

const Root = ({ children }) => {
  const themeUiConfig = useThemeUiConfig()
  const { preset, prismPreset } = themeUiConfig

  const theme = preset.default || preset

  const themeWithPrism = merge(theme, {
    styles: {
      pre: prismPreset,
    },
  })

  const fullTheme = merge(themeWithPrism, localTheme)

  return (
    <ThemeProvider theme={fullTheme} components={components}>
      {children}
    </ThemeProvider>
  )
}

export const WrapRootElement = ({ element }) => {
  return <Root>{element}</Root>
}
