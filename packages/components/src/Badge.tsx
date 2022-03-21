import React from 'react'

import { Box, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export type BadgeProps = BoxProps

export const Badge: ForwardRef<HTMLDivElement, BadgeProps> = React.forwardRef(
  function Badge(props, ref) {
    return (
      <Box
        ref={ref}
        variant="primary"
        {...props}
        {...__internalProps({
          __themeKey: 'badges',
          __css: {
            display: 'inline-block',
            verticalAlign: 'baseline',
            fontSize: 0,
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            px: 1,
            borderRadius: 2,
            color: 'white',
            bg: 'primary',
          },
        })}
      />
    )
  }
)
