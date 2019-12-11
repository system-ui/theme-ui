// TODO: rollup/microbundle screw this up

export { ThemeProvider } from './provider'
export { BaseStyles } from './base-styles'
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
  InitializeColorMode,
  ColorMode,
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
