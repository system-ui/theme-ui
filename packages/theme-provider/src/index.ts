import {
  jsx,
  useThemeUI,
  ThemeProvider as CoreProvider,
  ThemeProviderProps as CoreThemeProviderProps,
  IntrinsicSxElements,
  __internalGetUseRootStyles,
} from '@theme-ui/core'
import { css, Theme } from '@theme-ui/css'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { MDXProvider, MDXProviderComponents } from '@theme-ui/mdx'
import { Global } from '@emotion/react'

const RootStyles = () =>
  jsx(Global, {
    styles: (emotionTheme) => {
      const theme = emotionTheme as Theme
      const use = __internalGetUseRootStyles(theme)

      if (use.rootStyles === false || (theme.styles && !theme.styles.root)) {
        return false
      }
      const boxSizing = theme.useBorderBox === false ? undefined : 'border-box'

      return css({
        '*': {
          boxSizing,
        },
        [use.scope]: {
          margin: 0,
          variant: 'styles.root',
        },
      })(theme)
    },
  })

interface ThemeProviderProps extends Pick<CoreThemeProviderProps, 'theme'> {
  children?: React.ReactNode
  components?: MDXProviderComponents
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  components,
  children,
}) => {
  const outer = useThemeUI()

  if (typeof outer.setColorMode === 'function') {
    return jsx(
      CoreProvider,
      { theme },
      jsx(MDXProvider, {
        components,
        children,
      })
    )
  }

  return jsx(
    CoreProvider,
    { theme },
    jsx(
      ColorModeProvider,
      null,
      jsx(RootStyles),
      jsx(MDXProvider, {
        components,
        children,
      })
    )
  )
}
