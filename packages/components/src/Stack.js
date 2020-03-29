import React from 'react'
import Box from './Box'

export const Stack = React.forwardRef(
  ({ gap = 2, flow = 'row', ...props }, ref) => {
    return (
      <Box
        ref={ref}
        {...props}
        __themeKey="stacks"
        __css={{
          display: 'grid',
          gridGap: gap,
          gridAutoFlow: flow,
        }}
      />
    )
  }
)
