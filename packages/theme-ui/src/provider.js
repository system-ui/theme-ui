import {
  jsx,
  useThemeUI,
  ThemeProvider as CoreProvider,
} from '@theme-ui/core'
import {
  ColorModeProvider,
} from '@theme-ui/color-modes'
import {
  MDXProvider,
} from '@theme-ui/mdx'

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
      jsx(MDXProvider, {
        components,
        children
      })
    )
  )
}
