/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Container = React.forwardRef(function Container(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      config={{
        group: 'layout',
        sx: {
          width: '100%',
          maxWidth: 'container',
          mx: 'auto',
        },
      }}
    />
  )
})
