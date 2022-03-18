import React from 'react'
import type { ThemeUICSSObject } from '@theme-ui/css'

import { Link, LinkProps } from './Link'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export type NavLinkProps = LinkProps
/**
 * Link component for use in navigation
 *
 * NavLink variants can be defined in the `theme.links` object.
 * By default the NavLink component will use styles defined in `theme.links.nav`.
 * @see https://theme-ui.com/components/nav-link
 */
export const NavLink: ForwardRef<HTMLAnchorElement, NavLinkProps> =
  React.forwardRef(function NavLink(props, ref) {
    const __css: ThemeUICSSObject = {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      '&:hover, &:focus, &.active': {
        color: 'primary',
      },
    }

    return (
      <Link
        ref={ref}
        variant="nav"
        {...props}
        {...__internalProps({ __css })}
      />
    )
  })
