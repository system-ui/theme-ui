/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import { useVariant } from './util'
import Box from './Box'

export const Alert = React.forwardRef(function Alert({ variant, ...props }, ref) {
  const variantStyle = useVariant('alerts', variant)
  return (
    <Box
      ref={ref}
      {...props}
      __css={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2,
        fontWeight: 'bold',
        color: 'white',
        bg: 'primary',
        borderRadius: 4,
        ...variantStyle,
      }}
    />
  )
})
