import React from 'react'
import Box from './Box'

export const Flex = React.forwardRef(function Flex(
  { gap, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      {...props}
      __css={{
        display: 'flex',
        gap,
      }}
    />
  )
})

Flex.displayName = 'Flex'
