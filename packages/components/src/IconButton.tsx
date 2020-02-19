import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface IconButtonProps
  extends Assign<React.ComponentPropsWithRef<'button'>, BoxOwnProps> {
  size?: number | string
}
/**
 * Transparent button for SVG icons
 *
 * IconButton variants can be defined in the `theme.buttons` object.
 * By default the IconButton component will use styles defined in `theme.buttons.icon`.
 *
 * @see https://theme-ui.com/components/icon-button
 */

export const IconButton: ForwardRef<
  HTMLButtonElement,
  IconButtonProps
> = React.forwardRef(({ size = 32, ...props }, ref) => (
  <Box
    ref={ref} //TODO
    as="button"
    variant="icon"
    {...props}
    __themeKey="buttons"
    css={{
      appearance: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      width: size,
      height: size,
      color: 'inherit',
      bg: 'transparent',
      border: 'none',
      borderRadius: 4,
    }}
  />
))
