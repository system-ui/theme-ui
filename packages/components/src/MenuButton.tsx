/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'

import { IconButton, IconButtonProps } from './IconButton'
import type { ForwardRef } from './types'

export const MenuIcon = ({ size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      css={{
        display: 'block',
        margin: 0,
        boxSizing: 'border-box',
        minWidth: 0,
      }}
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  )
}

export type MenuButtonProps = IconButtonProps
/**
 * MenuButton variants can be defined in the `theme.buttons` object.
 * By default the MenuButton component will use styles defined in `theme.buttons.menu`.
 *
 * @see https://theme-ui.com/components/menu-button
 */
export const MenuButton: ForwardRef<HTMLButtonElement, MenuButtonProps> =
  React.forwardRef(function MenuButton(props, ref) {
    return (
      <IconButton
        ref={ref}
        title="Menu"
        aria-label="Toggle Menu"
        variant="menu"
        {...props}
      >
        <MenuIcon />
      </IconButton>
    )
  })
