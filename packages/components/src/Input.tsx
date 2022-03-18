import React from 'react'

import { Box, BoxOwnProps } from './Box'
import { get, ThemeUIStyleObject } from '@theme-ui/css'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

const autofillStyles: ThemeUIStyleObject = {
  boxShadow: 'inset 0 0 0 1000px var(--theme-ui-input-autofill-bg)',
  fontSize: 'inherit',
  ':first-line': {
    fontSize: '1rem',
  },
}

const defaultInputStyles: ThemeUIStyleObject = {
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

  ':autofill, :autofill:hover, :autofill:focus': autofillStyles,
  ':-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus':
    autofillStyles,
}

export interface InputProps
  extends Assign<React.ComponentPropsWithRef<'input'>, BoxOwnProps> {
  autofillBackgroundColor?: string
}

/**
 * Input variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.input` variant by default.
 * @see https://theme-ui.com/components/input/
 */
export const Input: ForwardRef<HTMLInputElement, InputProps> = React.forwardRef(
  function Input({ sx, autofillBackgroundColor = 'background', ...rest }, ref) {
    return (
      <Box
        ref={ref}
        as="input"
        variant="input"
        sx={{
          '--theme-ui-input-autofill-bg': (theme) =>
            theme.colors && get(theme.colors, autofillBackgroundColor, null),
          ...sx,
        }}
        {...rest}
        {...__internalProps({
          __themeKey: 'forms',
          __css: defaultInputStyles,
        })}
      />
    )
  }
)
