/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Avatar = React.forwardRef(function Avatar(
  { size = 48, ...props },
  ref
) {
  return (
    <Box
      as="img"
      ref={ref}
      width={size}
      height={size}
      variant="avatar"
      {...props}
      config={{
        group: 'images',
        sx: {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 9999,
        },
      }}
    />
  )
})
