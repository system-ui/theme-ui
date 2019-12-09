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

// TODO: work this into root provider/global styles?
export const BaseStyles = props =>
  jsx('div', {
    ...props,
    sx: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      variant: 'styles',
    },
  })

export {
  css,
  get,
} from '@theme-ui/css'
export {
  jsx,
  Context,
  merge,
  useThemeUI,
} from '@theme-ui/core'
export {
  useColorMode,
} from '@theme-ui/color-modes'
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
