import React from 'react'
import Box from './Box'

export const Badge = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __themeKey="badges"
    __css={{
      display: 'inline-block',
      verticalAlign: 'baseline',
      fontSize: 0,
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      px: 1,
      borderRadius: 2,
      color: 'white',
      bg: 'primary',
    }}
  />
))
