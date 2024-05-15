import React from 'react'
import {
  jsx,
  useThemeUI,
  ThemeProvider as CoreProvider,
  ThemeProviderProps as CoreThemeProviderProps,
  __themeUiDefaultContextValue,
} from '@theme-ui/core'
import { css, Theme } from '@theme-ui/css'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { Global } from '@emotion/react'

const RootStyles = () =>
  jsx(Global, {
    styles: (emotionTheme: unknown) => {
      const theme = emotionTheme as Theme
      const { useRootStyles } = theme.config || theme

      if (useRootStyles === false || (theme.styles && !theme.styles.root)) {
        return null
      }

      const boxSizing =
        theme.config?.useBorderBox === false ? undefined : 'border-box'

      return css({
        '*': {
          boxSizing,
        },
        html: {
          variant: 'styles.root',
        },
        body: {
          margin: 0,
        },
      })(theme)
    },
  })

export interface ThemeProviderProps
  extends Pick<CoreThemeProviderProps, 'theme'> {
  children?: React.ReactNode
}

export const ThemeUIProvider = ({ theme, children }: ThemeProviderProps) => {
  const outer = useThemeUI()

  const isTopLevel = outer === __themeUiDefaultContextValue

  return (
    <CoreProvider theme={theme}>
      <ColorModeProvider>
        {isTopLevel && <RootStyles />}
        {children}
      </ColorModeProvider>
    </CoreProvider>
  )
}
