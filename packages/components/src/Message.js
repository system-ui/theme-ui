/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

export const Message = React.forwardRef(function Message(
  { variant, ...props },
  ref
) {
  const variation = useVariant('messages', variant)
  return (
    <Box
      ref={ref}
      {...props}
      __css={{
        padding: 3,
        paddingLeft: t => t.space[3] - t.space[1],
        borderLeftWidth: t => t.space[1],
        borderLeftStyle: 'solid',
        borderLeftColor: 'primary',
        borderRadius: 4,
        bg: 'highlight',
        ...variation,
      }}
    />
  )
})
