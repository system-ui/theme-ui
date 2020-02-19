import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface InputProps
  extends Assign<React.ComponentProps<'input'>, BoxOwnProps> {}
/**
 * Input variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.input` variant by default.
 * @see https://theme-ui.com/components/input/
 */

export const Input: ForwardRef<HTMLInputElement, InputProps> = React.forwardRef(
  (props, ref) => (
    <Box
      ref={ref}
      as="input"
      variant="input"
      {...props}
      __themeKey="forms"
      css={{
        display: 'block',
        width: '100%',
        p: 2,
        appearance: 'none',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        border: '1px solid',
        borderRadius: 4,
        color: 'inherit',
        bg: 'transparent',
      }}
    />
  )
)
