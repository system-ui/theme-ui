import React from 'react'
import { Link, LinkProps } from './Link'
import { ForwardRef } from './Box'

export type NavLinkProps = LinkProps
/**
 * Link component for use in navigation
 *
 * NavLink variants can be defined in the `theme.links` object.
 * By default the NavLink component will use styles defined in `theme.links.nav`.
 * @see https://theme-ui.com/components/nav-link
 */

export const NavLink: ForwardRef<
  HTMLAnchorElement,
  NavLinkProps
> = React.forwardRef((props, ref) => (
  <Link
    ref={ref}
    variant="nav"
    {...props}
    css={{
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      '&:hover, &:focus, &.active': {
        color: 'primary',
      },
    }}
  />
))
