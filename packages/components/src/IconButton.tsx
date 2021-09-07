import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

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
export const IconButton: ForwardRef<HTMLButtonElement, IconButtonProps> =
  React.forwardRef(function IconButton(
    { size = 32, ...props }: IconButtonProps,
    ref
  ) {
    return (
      <Box
        ref={ref}
        as="button"
        variant="icon"
        {...props}
        // @ts-expect-error
        __themeKey="buttons"
        __css={{
          // @ts-expect-error
          label: props.__css?.label || 'IconButton',
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
    )
  })
