import React from 'react'
import Box from './Box'

export const Button = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="button"
    variant="primary"
    {...props}
    __themeKey="buttons"
    __css={{
      appearance: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      py: 2,
      color: 'white',
      bg: 'primary',
      border: 0,
      borderRadius: 4,
    }}
  />
))
