import React from 'react'

import { Box, BoxProps } from './Box'
import { ForwardRef } from './types'

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
        // @ts-expect-error internal prop
        __themeKey="text"
      />
    )
  }
)
