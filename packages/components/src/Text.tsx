import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

export type TextProps = BoxProps
/**
 * Primitive typographic component.
 *
 * Text style variants can be defined in the theme.text object.
 * @see https://theme-ui.com/components/text
 */

export const Text: ForwardRef<
  HTMLDivElement,
  BoxProps
> = React.forwardRef((props, ref) => (
  <Box ref={ref} {...props} __themeKey="text" />
))
