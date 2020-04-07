/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Image = React.forwardRef(function Image(
  { variant, ...props },
  ref
) {
  const variantStyle = useVariant('images', variant)
  return (
    <Box
      ref={ref}
      as="img"
      {...props}
      __css={{
        maxWidth: '100%',
        height: 'auto',
        ...props.__css,
        ...variantStyle,
      }}
    />
  )
})
