import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

type AlertProps = BoxProps
/**
 * Component for displaying messages, notifications, or other application state.
 *
 * Alert variants can be defined in `theme.alerts`.
 * The Alert component uses `theme.alerts.primary` as its default variant.
 */

export const Alert: ForwardRef<HTMLDivElement, AlertProps> = React.forwardRef(
  (props, ref) => (
    <Box
      ref={ref}
      {...props}
      __themeKey="alerts"
      css={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2,
        fontWeight: 'bold',
        color: 'white',
        bg: 'primary',
        borderRadius: 4,
      }}
    />
  )
)
