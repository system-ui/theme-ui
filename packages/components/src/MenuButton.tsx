import React from 'react'
import Box, { ForwardRef } from './Box'
import { IconButton, IconButtonProps } from './IconButton'

export interface MenuButtonProps extends IconButtonProps {
  size?: number | string
}
/**
 * MenuButton variants can be defined in the `theme.buttons` object.
 * By default the MenuButton component will use styles defined in `theme.buttons.menu`.
 *
 * @see https://theme-ui.com/components/menu-button
 */

export const MenuIcon: ForwardRef<HTMLButtonElement, MenuButtonProps> = ({
  size = 24,
}) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg" // TODO
    width={size}
    height={size}
    fill="currentcolor"
    viewBox="0 0 24 24"
    sx={{
      display: 'block',
      margin: 0,
    }}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </Box>
)

export const MenuButton = React.forwardRef((props, ref) => (
  <IconButton
    ref={ref} // TODO
    title="Menu"
    aria-label="Toggle Menu"
    variant="menu"
    {...props}>
    <MenuIcon />
  </IconButton>
))
