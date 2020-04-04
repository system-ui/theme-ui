/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Image = React.forwardRef(function Image(
  { variant, ...props },
  ref
) {
  const variation = useVariant('images', variant)
  return (
    <Box
      ref={ref}
      as="img"
      {...props}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        ...variation,
      }}
    />
  )
})
