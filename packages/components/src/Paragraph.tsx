import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

export interface ParagraphProps
  extends Assign<React.ComponentPropsWithRef<'p'>, BoxOwnProps> {}

/**
 * Primitive typographic component.
 *
 * Text style variants can be defined in the theme.text object.
 * The Paragraph component uses theme.text.paragraph as its default variant style.
 * @see https://theme-ui.com/components/paragraph
 */
export const Paragraph: ForwardRef<HTMLParagraphElement, ParagraphProps> =
  React.forwardRef(function Paragraph(props, ref) {
    return (
      <Box
        ref={ref}
        as="p"
        variant="paragraph"
        {...props}
        // @ts-expect-error internal prop
        __themeKey="text"
        __css={{
          fontFamily: 'body',
          fontWeight: 'body',
          lineHeight: 'body',
        }}
      />
    )
  })
