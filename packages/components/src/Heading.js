/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Heading = React.forwardRef(function Heading(props, ref) {
  return (
    <Box
      ref={ref}
      as="h2"
      variant="heading"
      {...props}
      config={{
        group: 'text',
        sx: {
          fontFamily: 'heading',
          fontWeight: 'heading',
          lineHeight: 'heading',
        },
      }}
    />
  )
})
