import React from 'react'

import { Box, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export type CardProps = BoxProps
/**
 * Card style variants can be defined in the `theme.cards` object.
 * By default the Card component uses the `theme.cards.primary` variant.
 * @see https://theme-ui.com/components/card
 */
export const Card: ForwardRef<HTMLDivElement, CardProps> = React.forwardRef(
  function Card(props, ref) {
    return (
      <Box
        ref={ref}
        variant="primary"
        {...props}
        {...__internalProps({ __themeKey: 'cards' })}
      />
    )
  }
)
