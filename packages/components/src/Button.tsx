import React from 'react'

import { Box as _Box, BoxOwnProps, BoxProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

const Box = _Box as React.ForwardRefExoticComponent<
  BoxProps & React.RefAttributes<HTMLButtonElement>
>

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
        ref={ref as React.Ref<HTMLButtonElement>}
        as="button"
        variant="primary"
        {...(props as BoxProps)}
        {...__internalProps({
          __themeKey: 'buttons',
          __css: {
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
          },
        })}
      />
    )
  })
