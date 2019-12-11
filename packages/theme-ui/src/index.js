// TODO: rollup/microbundle screw this up

import {
  jsx,
  Context,
  merge,
  useThemeUI,
} from '@theme-ui/core'
import {
  useColorMode,
  InitializeColorMode,
  ColorMode,
} from '@theme-ui/color-modes'
import {
  Styled,
  components,
} from '@theme-ui/mdx'

import { ThemeProvider } from './provider'
import { BaseStyles } from './base-styles'

export {
  jsx,
  Context,
  merge,
  useThemeUI,
  useColorMode,
  InitializeColorMode,
  ColorMode,
  Styled,
  components,
}
export {
  ThemeProvider,
  BaseStyles,
}
export * from '@theme-ui/components'

/*
export { ColorMode, useColorMode, InitializeColorMode } from './color-modes'
export { Box, Flex, Layout, Header, Main, Container, Footer } from './layout'
export { BaseStyles } from './base-styles'
export { css, get } from '@theme-ui/css'
*/
