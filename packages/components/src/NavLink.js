/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const NavLink = React.forwardRef(function NavLink(props, ref) {
  return (
    <Box
      as="a"
      ref={ref}
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
  )
})
