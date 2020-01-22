import React from 'react'
import Box from './Box'
import { IconButton } from './IconButton'

export const MenuIcon = ({ size = 24 }) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
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
    ref={ref}
    title="Menu"
    aria-label="Toggle Menu"
    variant="menu"
    {...props}>
    <MenuIcon />
  </IconButton>
))
