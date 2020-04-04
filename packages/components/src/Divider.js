/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Divider = React.forwardRef(function Divider(props, ref) {
  const variation = useVariant('styles', 'hr')
  return (
    <Box
      ref={ref}
      as="hr"
      {...props}
      sx={{
        color: 'gray',
        m: 0,
        my: 2,
        border: 0,
        borderBottom: '1px solid',
        ...variation,
      }}
    />
  )
})
