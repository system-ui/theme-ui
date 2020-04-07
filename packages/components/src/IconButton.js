/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const IconButton = React.forwardRef(function IconButton(
  { size = 32, variant = 'icon', ...props },
  ref
) {
  const variantStyle = useVariant('buttons', variant)
  return (
    <Box
      ref={ref}
      as="button"
      {...props}
      __css={{
        appearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        width: size,
        height: size,
        color: 'inherit',
        bg: 'transparent',
        border: 'none',
        borderRadius: 4,
        ...variantStyle,
      }}
    />
  )
})
