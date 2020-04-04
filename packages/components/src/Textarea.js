/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Textarea = React.forwardRef(function Textarea(props, ref) {
  const variation = useVariant('forms', 'textarea')
  return (
    <Box
      ref={ref}
      as="textarea"
      {...props}
      sx={{
        display: 'block',
        width: '100%',
        p: 2,
        appearance: 'none',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        border: '1px solid',
        borderRadius: 4,
        color: 'inherit',
        bg: 'transparent',
        ...variation
      }}
    />
  )
})
