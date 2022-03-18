import React from 'react'

import { Box, BoxOwnProps, BoxProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps, __ThemeUIComponentsInternalProps } from './util'

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
    const emotionCssLabel =
      (props as __ThemeUIComponentsInternalProps).__css?.label || 'IconButton'

    return (
      <Box
        ref={ref}
        as="button"
        variant="icon"
        {...(props as BoxProps)}
        {...__internalProps({
          __themeKey: 'buttons',
          __css: {
            label: emotionCssLabel,
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
          },
        })}
      />
    )
  })
