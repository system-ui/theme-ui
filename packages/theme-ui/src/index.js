import {
  jsx,
  useThemeUI,
  ThemeProvider as CoreProvider,
  ColorModeProvider,
} from '@theme-ui/core'
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

export {
  css,
  get,
} from '@theme-ui/css'
export {
  jsx,
  Context,
  merge,
  useThemeUI,
  useColorMode,
} from '@theme-ui/core'
// consider @theme-ui/color-modes ???
export {
  Styled,
  components,
} from '@theme-ui/mdx'
export * from '@theme-ui/components'

/*
export { ColorMode, useColorMode, InitializeColorMode } from './color-modes'
export { Box, Flex, Layout, Header, Main, Container, Footer } from './layout'
export { BaseStyles } from './base-styles'
export { css, get } from '@theme-ui/css'
*/
