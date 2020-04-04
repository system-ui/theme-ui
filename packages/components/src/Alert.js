/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import { useVariant } from './util'

export const Alert = React.forwardRef(function Alert({ variant, ...props }, ref) {
  const variation = useVariant('alerts', variant)
  return (
    <div
      ref={ref}
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2,
        fontWeight: 'bold',
        color: 'white',
        bg: 'primary',
        borderRadius: 4,
        ...variation,
      }}
    />
  )
})
