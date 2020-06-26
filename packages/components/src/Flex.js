import React from 'react'
import Box from './Box'

export const Flex = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    config={{
      sx: {
        display: 'flex',
      },
    }}
  />
))
