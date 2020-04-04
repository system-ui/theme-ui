/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Heading = React.forwardRef(function Heading(props, ref) {
  const variation = useVariant('text', 'heading')
  return (
    <Box
      ref={ref}
      as="h2"
      {...props}
      sx={{
        fontFamily: 'heading',
        fontWeight: 'heading',
        lineHeight: 'heading',
        ...variation,
      }}
    />
  )
})
