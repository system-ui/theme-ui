import React from 'react'
import Box from './Box'

export const Message = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props}
    __themeKey="messages"
    __css={{
      padding: 3,
      paddingLeft: t => t.space[3] - t.space[1],
      borderLeftWidth: t => t.space[1],
      borderLeftStyle: 'solid',
      borderLeftColor: 'primary',
      borderRadius: 4,
      bg: 'highlight',
    }}
  />
))
