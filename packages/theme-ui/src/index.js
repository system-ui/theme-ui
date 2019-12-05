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
  // ThemeProvider,
  Context,
  useThemeUI,
} from '@theme-ui/core'
// @theme-ui/color-modes
export {
  Styled,
  components,
} from '@theme-ui/mdx'
// export {} from '@theme-ui/components'
/*
export { jsx } from './jsx'
export { ThemeProvider, ThemeStateProvider } from './provider'
export { Context, useThemeUI } from './context'
export { ColorMode, useColorMode, InitializeColorMode } from './color-modes'
export { Styled, components } from './components'
export { Box, Flex, Layout, Header, Main, Container, Footer } from './layout'
export { BaseStyles } from './base-styles'
export { css, get } from '@theme-ui/css'
*/
