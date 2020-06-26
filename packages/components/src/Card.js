import React from 'react'
import Box from './Box'

export const Card = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    variant="primary"
    {...props}
    config={{
      group: 'cards',
    }}
  />
))
