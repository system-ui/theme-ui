import React from 'react'
import Box from './Box'

export const AspectRatio = React.forwardRef(
  ({ ratio = 4 / 3, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Box
        sx={{
          width: '100%',
          height: 0,
          paddingBottom: 100 / ratio + '%',
        }}
      />
      <Box
        {...props}
        __css={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}>
        {children}
      </Box>
    </Box>
  )
)
