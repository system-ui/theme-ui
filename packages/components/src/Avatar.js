import React from 'react'
import Box from './Box'

export const Avatar = React.forwardRef(({ size = 48, ...props }, ref) => (
  <Box
    ref={ref}
    as="img"
    width={size}
    height={size}
    variant="avatar"
    {...props}
    config={{
      group: 'images',
      sx: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 9999,
      },
    }}
  />
))
