/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Label = React.forwardRef(function Label(props, ref) {
  const variation = useVariant('forms', 'label')
  return (
    <Box
      ref={ref}
      as="label"
      {...props}
      sx={{
        width: '100%',
        display: 'flex',
        ...variation,
      }}
    />
  )
})
