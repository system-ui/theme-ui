/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Label = React.forwardRef(function Label(props, ref) {
  return (
    <Box
      ref={ref}
      as="label"
      variant="label"
      {...props}
      config={{
        group: 'forms',
        sx: {
          width: '100%',
          display: 'flex',
        },
      }}
    />
  )
})
