/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Badge = React.forwardRef(function Badge(
  { variant, ...props },
  ref
) {
  const variation = useVariant('badges', variant)
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        display: 'inline-block',
        verticalAlign: 'baseline',
        fontSize: 0,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        px: 1,
        borderRadius: 2,
        color: 'white',
        bg: 'primary',
        ...variation,
      }}
    />
  )
})
