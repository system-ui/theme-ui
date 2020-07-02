/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Text = React.forwardRef(function Text(props, ref) {
  return (
    <Box
      ref={ref}
      variant="default"
      {...props}
      config={{
        group: 'text',
      }}
    />
  )
})
