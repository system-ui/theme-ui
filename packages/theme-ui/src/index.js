import { jsx } from '@theme-ui/core'

export {
  jsx,
  Context,
  merge,
  useThemeUI,
} from '@theme-ui/core'
export {
  useColorMode,
  InitializeColorMode,
} from '@theme-ui/color-modes'
export {
  Styled,
  components,
} from '@theme-ui/mdx'
export { ThemeProvider } from '@theme-ui/theme-provider'
export * from '@theme-ui/components'
export { css, get } from '@theme-ui/css'

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

