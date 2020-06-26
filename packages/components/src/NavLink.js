import React from 'react'
import Box from './Box'

export const NavLink = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="a"
    variant="nav"
    {...props}
    config={{
      group: 'links',
      sx: {
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'inline-block',
        '&:hover, &:focus, &.active': {
          color: 'primary',
        },
      },
    }}
  />
))
