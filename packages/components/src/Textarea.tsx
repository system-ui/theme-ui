import React from 'react'

import { Box, BoxOwnProps, BoxProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

export interface TextareaProps
  extends Assign<React.ComponentPropsWithRef<'textarea'>, BoxOwnProps> {}

/**
 * Form textarea component
 *
 * Textarea variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.textarea` variant by default.
 * @see https://theme-ui.com/components/textarea/
 */
export const Textarea: ForwardRef<HTMLTextAreaElement, TextareaProps> =
  React.forwardRef(function Textarea(props, ref) {
    return (
      <Box
        ref={ref}
        as="textarea"
        variant="textarea"
        {...(props as BoxProps)}
        {...__internalProps({
          __themeKey: 'forms',
          __css: {
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
          },
        })}
      />
    )
  })
