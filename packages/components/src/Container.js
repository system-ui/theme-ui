/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Container = React.forwardRef(function Container(
  { variant, ...props },
  ref
) {
  const variantStyle = useVariant('layout', variant)
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        width: '100%',
        maxWidth: 'container',
        mx: 'auto',
        ...variantStyle,
      }}
    />
  )
})
