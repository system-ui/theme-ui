/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Card = React.forwardRef(function Card(props, ref) {
  return (
    <Box
      ref={ref}
      variant="primary"
      {...props}
      config={{
        group: 'cards',
      }}
    />
  )
})
