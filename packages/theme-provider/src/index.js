import { jsx, useThemeUI, ThemeProvider as CoreProvider } from '@theme-ui/core'
import { css } from '@theme-ui/css'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { MDXProvider } from '@theme-ui/mdx'
import { Global } from '@emotion/core'

const BodyStyles = () =>
  jsx(Global, {
    styles: theme => {
      if (theme.useBodyStyles === false || (theme.styles && !theme.styles.root))
        return false
      const boxSizing = theme.useBorderBox === false ? null : 'border-box'

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

export const ThemeProvider = ({ theme, components, children }) => {
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
