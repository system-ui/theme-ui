/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Card = React.forwardRef(function Card(
  { variant = 'primary', ...props },
  ref
) {
  const variation = useVariant('cards', variant)
  return <Box ref={ref} {...props} sx={variation} />
})
