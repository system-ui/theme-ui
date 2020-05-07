import { jsx } from '@theme-ui/core'

export {
  jsx,
  Context,
  merge,
  useThemeUI,
  ContextValue,
  IntrinsicSxElements,
  SxProps,
  SxStyleProp,
} from '@theme-ui/core'
export { useColorMode, InitializeColorMode } from '@theme-ui/color-modes'
export { Styled, components } from '@theme-ui/mdx'
export { ThemeProvider } from '@theme-ui/theme-provider'
export * from '@theme-ui/components'
export {
  css,
  get,
  ColorMode,
  CSSObject,
  CSSProperties,
  CSSPseudoSelectorProps,
  ResponsiveStyleValue,
  SystemCssProperties,
  SystemStyleObject,
  Theme,
  TLengthStyledSystem,
  UseThemeFunction,
} from '@theme-ui/css'

// TODO: work this into root provider/global styles?
export const BaseStyles = (props: Record<string, unknown>) =>
  jsx('div', {
    ...props,
    sx: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      variant: 'styles',
    },
  })
