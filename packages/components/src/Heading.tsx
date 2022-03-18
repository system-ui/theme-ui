import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

export interface HeadingProps
  extends Assign<React.ComponentPropsWithRef<'h2'>, BoxOwnProps> {}

/**
 * Primitive heading component, defaults to <h2>.
 *
 * Text style variants can be defined in the theme.text object.
 * The Heading component uses theme.text.heading as its default variant style.
 * @see https://theme-ui.com/components/heading
 */
export const Heading: ForwardRef<HTMLHeadingElement, HeadingProps> =
  React.forwardRef(function Heading(props, ref) {
    return (
      <Box
        ref={ref}
        as="h2"
        variant="heading"
        {...props}
        {...__internalProps({
          __themeKey: 'text',
          __css: {
            fontFamily: 'heading',
            fontWeight: 'heading',
            lineHeight: 'heading',
          },
        })}
      />
    )
  })
