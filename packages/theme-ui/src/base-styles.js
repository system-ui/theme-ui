import { jsx } from '@theme-ui/core'

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
