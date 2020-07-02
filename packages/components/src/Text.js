/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Text = React.forwardRef(function Text(
  { variant = 'default', ...props },
  ref
) {
  const variantStyle = useVariant('text', variant)
  return <Box ref={ref} {...props} sx={variantStyle} />
})
