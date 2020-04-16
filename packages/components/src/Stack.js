import React from 'react'
import { Box } from './Box'

export const Stack = React.forwardRef(
  ({ gap = 2, children, ...props }, ref) => (
    <Box
      ref={ref}
      {...props}
      __themeKey="stacks"
      __css={{
        display: 'grid',
        gridGap: gap,
      }}>
      {children}
    </Box>
  )
)
