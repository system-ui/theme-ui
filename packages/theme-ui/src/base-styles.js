/** @jsx jsx */
import { jsx } from '@theme-ui/core'

export const BaseStyles = props =>
  <div
    {...props}
    sx={{
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      variant: 'styles',
    }}
  />

export default BaseStyles
