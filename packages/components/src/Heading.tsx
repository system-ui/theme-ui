import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface HeadingProps
  extends Assign<React.ComponentPropsWithRef<'h2'>, BoxOwnProps> {}
/**
 * Primitive heading component, defaults to <h2>.
 *
 * Text style variants can be defined in the theme.text object.
 * The Heading component uses theme.text.heading as its default variant style.
 * @see https://theme-ui.com/components/heading
 */

export const Heading: ForwardRef<
  HTMLHeadingElement,
  HeadingProps
> = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="h2"
    variant="heading"
    {...props}
    __themeKey="text"
    css={{
      fontFamily: 'heading',
      fontWeight: 'heading', //TODO
      lineHeight: 'heading',
    }}
  />
))
