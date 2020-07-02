/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      config={{
        group: 'alerts',
        sx: {
          display: 'flex',
          alignItems: 'center',
          px: 3,
          py: 2,
          fontWeight: 'bold',
          color: 'white',
          bg: 'primary',
          borderRadius: 4,
        },
      }}
    />
  )
})
