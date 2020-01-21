import React from 'react'
import { keyframes } from '@emotion/core'
import Box from './Box'

const range = n => {
  const v = []
  for (let i = 0; i < n; i++) {
    v.push(i)
  }
  return v
}

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const roller = keyframes({
  '0%, 20%, 80%, 100%': {
    transform: 'scale(1)',
  },
  '50%': {
    transform: 'scale(1.5)',
  },
})

const facebook = keyframes({
  '0%': {
    top: '8px',
    height: '48px',
  },
  '50%, 100%': {
    top: '24px',
    height: '24px',
  },
})

const animations = { primary: spin, dualring: spin, roller, facebook }

export const Spinner = props => {
  const {
    variant = 'primary',
    duration = 600,
    width = 48,
    height = 48,
    item = {},
  } = props

  const { getX = () => 0, getY = () => 0, count = 1 } = item

  return (
    <Box
      role="img"
      {...props}
      __themeKey="spinners"
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: `${width}px`,
        height: `${height}px`,
      }}>
      {range(count).map(v => {
        return (
          <Box
            key={v}
            sx={{
              position: 'absolute',
              display: 'block',
              width: `${item.width || width}px`,
              height: `${item.height || height}px`,
              animationIterationCount: 'infinite',
              animationName: animations[variant].toString(),
              animationDuration: `${duration}ms`,
              animationDelay: `${(item.delay || 0) * v}ms`,
              top: `${getY(v, count, height)}px`,
              left: `${getX(v, count, width)}px`,
            }}
          />
        )
      })}
    </Box>
  )
}
