import React from 'react'
import Box from './Box'

export const IconButton = React.forwardRef(({ size = 32, ...props }, ref) => (
  <Box
    ref={ref}
    as="button"
    variant="icon"
    {...props}
    config={{
      group: 'buttons',
      sx: {
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
      },
    }}
  />
))
