/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Image = React.forwardRef(function Image(props, ref) {
  return (
    <Box
      ref={ref}
      as="img"
      variant="default"
      {...props}
      config={{
        group: 'images',
        sx: {
          maxWidth: '100%',
          height: 'auto',
        },
      }}
    />
  )
})
