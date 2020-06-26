import React from 'react'
import Box from './Box'

export const Container = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    variant="container"
    {...props}
    config={{
      group: 'layout',
      sx: {
        width: '100%',
        maxWidth: 'container',
        mx: 'auto',
      },
    }}
  />
))
