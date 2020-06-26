import React from 'react'
import Box from './Box'

export const Label = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="label"
    variant="label"
    {...props}
    config={{
      group: 'forms',
      sx: {
        width: '100%',
        display: 'flex',
      },
    }}
  />
))
