import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface LabelProps
  extends Assign<React.ComponentProps<'label'>, BoxOwnProps> {}
/**
 * Label variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.label` variant by default.
 * @see https://theme-ui.com/components/label/
 */

export const Label: ForwardRef<HTMLLabelElement, LabelProps> = React.forwardRef(
  (props, ref) => (
    <Box
      ref={ref} // TODO
      as="label"
      variant="label"
      {...props}
      __themeKey="forms"
      css={{
        width: '100%',
        display: 'flex',
      }}
    />
  )
)
