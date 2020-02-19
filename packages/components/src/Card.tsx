import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

export type CardProps = BoxProps
/**
 * Card style variants can be defined in the `theme.cards` object.
 * By default the Card component uses the `theme.cards.primary` variant.
 * @see https://theme-ui.com/components/card
 */

export const Card: ForwardRef<
  HTMLDivElement,
  CardProps
> = React.forwardRef((props, ref) => (
  <Box ref={ref} variant="primary" {...props} __themeKey="cards" />
))
