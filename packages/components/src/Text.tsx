import React from 'react'

import { Box, BoxProps } from './Box'
import { ForwardRef } from './types'
import { __internalProps } from './util'

export type TextProps = BoxProps

/**
 * Primitive typographic component.
 *
 * Text style variants can be defined in the theme.text object.
 * @see https://theme-ui.com/components/text
 */
export const Text: ForwardRef<HTMLDivElement, TextProps> = React.forwardRef(
  function Text(props, ref) {
    return (
      <Box
        as="span"
        ref={ref}
        variant="default"
        {...props}
        {...__internalProps({
          __themeKey: 'text',
        })}
      />
    )
  }
)
