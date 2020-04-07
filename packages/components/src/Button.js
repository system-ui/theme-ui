/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Button = React.forwardRef(function Button(
  { variant = 'primary', ...props },
  ref
) {
  const variantStyle = useVariant('buttons', variant)
  return (
    <Box
      ref={ref}
      as="button"
      {...props}
      sx={{
        appearance: 'none',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        px: 3,
        py: 2,
        color: 'white',
        bg: 'primary',
        border: 0,
        borderRadius: 4,
        ...variantStyle,
      }}
    />
  )
})
