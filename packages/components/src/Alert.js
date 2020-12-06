import React from 'react'
import Box from './Box'

export const Alert = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    variant="primary"
    {...props}
    __themeKey="alerts"
    __css={{
      display: 'flex',
      alignItems: 'center',
      px: 3,
      py: 2,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      borderRadius: 4,
    }}
  />
))
