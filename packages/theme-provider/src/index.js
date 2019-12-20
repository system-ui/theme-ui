import {
  jsx,
  useThemeUI,
  ThemeProvider as CoreProvider,
} from '@theme-ui/core'
import { ColorModeProvider } from '@theme-ui/color-modes'
import { MDXProvider } from '@theme-ui/mdx'
import { Global } from '@emotion/core'

const BodyStyles = ({ theme = {} }) => {
  if (theme.useBodyStyles === false) return false

  return jsx(Global, {
    styles: theme => {
      const fontFamily = theme.fonts && theme.fonts.body
      const fontWeight = theme.fontWeights && theme.fontWeights.body
      const lineHeight = theme.lineHeights && theme.lineHeights.body

      return {
        body: {
          fontFamily,
          fontWeight,
          lineHeight,
        }
      }
    }
  })
}

export const ThemeProvider = ({
  theme,
  components,
  children
}) => {
  const outer = useThemeUI()

  if (typeof outer.setColorMode === 'function') {
    return jsx(CoreProvider, { theme },
      jsx(MDXProvider, {
        components,
        children
      })
    )
  }

  return jsx(CoreProvider, { theme },
    jsx(ColorModeProvider, null,
      jsx(BodyStyles, { theme }),
      jsx(MDXProvider, {
        components,
        children
      })
    )
  )
}
