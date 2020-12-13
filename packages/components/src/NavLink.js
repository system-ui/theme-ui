import React from 'react'
import { Link } from './Link'

export const NavLink = React.forwardRef(function NavLink(props, ref) {
  return (
    <Link
      ref={ref}
      variant="nav"
      {...props}
      __css={{
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'inline-block',
        '&:hover, &:focus, &.active': {
          color: 'primary',
        },
      }}
    />
  )
})
