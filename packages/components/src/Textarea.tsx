import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface TextareaProps
  extends Assign<React.ComponentProps<'textarea'>, BoxOwnProps> {}
/**
 * Form textarea component
 *
 * Textarea variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.textarea` variant by default.
 * @see https://theme-ui.com/components/textarea/
 */

export const Textarea: ForwardRef<
  HTMLTextAreaElement,
  TextareaProps
> = React.forwardRef((props, ref) => (
  <Box
    ref={ref} // TODO
    as="textarea"
    variant="textarea"
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
))
