import React from 'react'
import Box from './Box'

export const Link = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="a"
    variant="styles.a"
    {...props}
    config={{
      group: 'links',
    }}
  />
))
