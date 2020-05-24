import {
  jsx,
  useThemeUI,
  ThemeProvider as CoreProvider,
  ThemeProviderProps as CoreThemeProviderProps,
  IntrinsicSxElements,
} from '@theme-ui/core'
import { css, Theme } from '@theme-ui/css'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { MDXProvider } from '@theme-ui/mdx'
import { Global } from '@emotion/core'

const BodyStyles = () =>
  jsx(Global, {
    styles: emotionTheme => {
      const theme = emotionTheme as Theme
      if (
        theme.useBodyStyles === false ||
        (theme.styles && !theme.styles.root)
      ) {
        return false
      }
      const boxSizing = theme.useBorderBox === false ? undefined : 'border-box'

      return css({
        '*': {
          boxSizing,
        },
        body: {
          margin: 0,
          variant: 'styles.root',
        },
      })(theme)
    },
  })

type ProvidedComponentsKnownKeys = {
  [key in keyof IntrinsicSxElements]?: React.ComponentType<any> | string
}
export interface ProvidedComponents extends ProvidedComponentsKnownKeys {
  [key: string]: React.ComponentType<any> | string | undefined
}

interface ThemeProviderProps extends Pick<CoreThemeProviderProps, 'theme'> {
  children?: React.ReactNode
  components?: ProvidedComponents
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
      jsx(BodyStyles),
      jsx(MDXProvider, {
        components,
        children,
      })
    )
  )
}
