import React from 'react'
import Box from './Box'

export const Image = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="img"
    {...props}
    config={{
      group: 'images',
      sx: {
        maxWidth: '100%',
        height: 'auto',
      },
    }}
  />
))
