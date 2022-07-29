import React from 'react'

import { Box, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export type AlertProps = BoxProps

/**
 * Component for displaying messages, notifications, or other application state.
 *
 * Alert variants can be defined in `theme.alerts`.
 * The Alert component uses `theme.alerts.primary` as its default variant.
 */
export const Alert: ForwardRef<HTMLDivElement, AlertProps> = React.forwardRef(
  function Alert(props, ref) {
    return (
      <Box
        ref={ref}
        variant="primary"
        {...props}
        {...__internalProps({
          __themeKey: 'alerts',
          __css: {
            display: 'flex',
            alignItems: 'center',
            px: 3,
            py: 2,
            fontWeight: 'bold',
            color: 'white',
            bg: 'primary',
            borderRadius: 4,
          },
        })}
      />
    )
  }
)
