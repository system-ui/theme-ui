/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Message = React.forwardRef(function Message(props, ref) {
  return (
    <Box
      ref={ref}
      variant="default"
      {...props}
      config={{
        group: 'messages',
        sx: {
          padding: 3,
          paddingLeft: (t) => t.space[3] - t.space[1],
          borderLeftWidth: (t) => t.space[1],
          borderLeftStyle: 'solid',
          borderLeftColor: 'primary',
          borderRadius: 4,
          bg: 'highlight',
        },
      }}
    />
  )
})
