import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

export interface LabelProps
  extends Assign<React.ComponentPropsWithRef<'label'>, BoxOwnProps> {}

/**
 * Label variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.label` variant by default.
 * @see https://theme-ui.com/components/label/
 */
export const Label: ForwardRef<HTMLLabelElement, LabelProps> = React.forwardRef(
  function Label(props, ref) {
    return (
      <Box
        ref={ref}
        as="label"
        variant="label"
        {...props}
        // @ts-expect-error
        __themeKey="forms"
        __css={{
          width: '100%',
          display: 'flex',
        }}
      />
    )
  }
)
