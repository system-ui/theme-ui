import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

export interface ButtonProps
  extends Assign<React.ComponentPropsWithRef<'button'>, BoxOwnProps> {}
/**
 * Primitive button component with variants
 * @see https://theme-ui.com/components/button
 */
export const Button: ForwardRef<HTMLButtonElement, ButtonProps> =
  React.forwardRef(function Button(props, ref) {
    return (
      <Box
        ref={ref}
        as="button"
        variant="primary"
        {...props}
        // @ts-expect-error
        __themeKey="buttons"
        __css={{
          appearance: 'none',
          display: props.hidden ? undefined : 'inline-block',
          textAlign: 'center',
          lineHeight: 'inherit',
          textDecoration: 'none',
          fontSize: 'inherit',
          px: 3,
          py: 2,
          color: 'white',
          bg: 'primary',
          border: 0,
          borderRadius: 4,
        }}
      />
    )
  })
