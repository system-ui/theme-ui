import React from 'react'
import { keyframes } from '@emotion/core'
import Box from './Box'

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export const Spinner = React.forwardRef(({
  size = 48,
  strokeWidth = 4,
  max = 1,
  title = 'Loading...',
  duration = 500,
  ...props
}, ref) => {
  const r = 16 - (strokeWidth)
  const C = 2 * r * Math.PI
  const offset = C - (1/4 * C)

  return (
    <Box
      ref={ref}
      as='svg'
      viewBox='0 0 32 32'
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      fill='none'
      stroke='currentcolor'
      role='img'
      {...props}
      __css={{
        color: 'primary',
        overflow: 'visible',
      }}>
      <title>{title}</title>
      <circle
        cx={16}
        cy={16}
        r={r}
        opacity={1/8}
      />
      <Box
        as='circle'
        cx={16}
        cy={16}
        r={r}
        strokeDasharray={C}
        strokeDashoffset={offset}
        __css={{
          transformOrigin: '50% 50%',
          animationName: spin.toString(),
          animationTimingFunction: 'linear',
          animationDuration: duration + 'ms',
          animationIterationCount: 'infinite',
        }}
      />
    </Box>
  )
})
