/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Input = React.forwardRef(function Input(props, ref) {
  const variantStyle = useVariant('forms', 'input')
  return (
    <Box
      ref={ref}
      as="input"
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
        ...variantStyle,
      }}
    />
  )
})
