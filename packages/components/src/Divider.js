import React from 'react'
import Box from './Box'

export const Divider = React.forwardRef((props, ref) => (
  <Box
    as='hr'
    variant='__styles.hr'
    {...props}
    __css={{
      color: 'gray',
      m: 0,
      my: 2,
      border: 0,
      borderBottom: '1px solid',
    }}
  />
))
