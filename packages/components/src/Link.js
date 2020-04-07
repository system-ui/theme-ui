/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Link = React.forwardRef(function Link(
  { variant = 'styles.a', ...props },
  ref
) {
  const variantStyle = useVariant('links', variant)
  return <Box ref={ref} as="a" {...props} sx={variantStyle} />
})
