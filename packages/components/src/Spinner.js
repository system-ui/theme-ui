import React from 'react'
import { keyframes } from '@emotion/core'
import Box from './Box'

const range = n => {
  const v = []
  for (let i = 0; i < n; i++) {
    v.push(i)
  }
  // TODO: change to [...Array(n).keys()]
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

const bar = keyframes({
  '0%': {
    top: '12.5%',
    height: '100%',
  },
  '50%, 100%': {
    top: '50%',
    height: '50%',
  },
})

const fade = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const animations = { spin, roller, bar, fade }

export const BasicSpinner = props => {
  const {
    animation = 'spin',
    duration = 1200,
    size = 48,
    items = 1,
    delay,
    getXY = () => [0, 0],
    itemWidth,
    itemHeight,
    angle = 0,
  } = props

  return (
    <Box
      role="img"
      {...props}
      __themeKey="spinners"
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
      }}>
      {range(items).map(index => {
        const cfg = { ...props, index, size }
        const pos = getXY(cfg)
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              display: 'block',
              width: `${itemWidth || size}px`,
              height: `${itemHeight || size}px`,
              animationIterationCount: 'infinite',
              animationName: animations[animation].toString(),
              animationDuration: `${duration}ms`,
              animationDelay: `${(delay || 0) * index}ms`,
              left: `${pos[0]}px`,
              top: `${pos[1]}px`,
              transform: `rotate(${angle * index}deg)`,
            }}
          />
        )
      })}
    </Box>
  )
}

export const Spinner = ({ duration, strokeWidth = 4 }) => (
  <BasicSpinner
    animation="spin"
    duration={duration}
    delay={-150}
    items={1}
    __css={{
      borderRadius: '50%',
      borderWidth: strokeWidth,
      borderStyle: 'solid',
      borderColor: 'rgba(51, 51, 238, 0.1)',
      '& > div': {
        content: '" "',
        borderRadius: '50%',
        left: `-${strokeWidth}px`,
        top: `-${strokeWidth}px`,
        borderWidth: strokeWidth,
        borderStyle: 'solid',
        borderColor: `#3333ee transparent transparent transparent`,
        animationTimingFunction: 'linear',
      },
    }}
  />
)

export const DualringSpinner = ({ duration, strokeWidth = 4 }) => (
  <BasicSpinner
    animation="spin"
    duration={duration}
    delay={-150}
    items={4}
    __css={{
      borderRadius: '50%',
      borderWidth: strokeWidth,
      borderStyle: 'solid',
      borderColor: 'rgba(51, 51, 238, 0.1)',
      '& > div': {
        content: '" "',
        borderRadius: '50%',
        left: `-${strokeWidth}px`,
        top: `-${strokeWidth}px`,
        borderWidth: strokeWidth,
        borderStyle: 'solid',
        borderColor: `#3333ee transparent transparent transparent`,
        animationTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
      },
    }}
  />
)

export const BarSpinner = ({ duration, size = 48 }) => (
  <BasicSpinner
    animation="bar"
    duration={duration}
    items={3}
    size={size}
    itemWidth={size / 4}
    itemHeight={size / 2}
    delay={100}
    getXY={({ index, itemWidth }) => [(size / 6 + itemWidth) * index, 0]}
    __css={{
      '& > div': {
        display: 'inline-block',
        background: '#3333ee',
        animationTimingFunction: 'cubic-bezier(0, 0.5, 0.5, 1)',
      },
    }}
  />
)

export const RollerSpinner = ({ duration = 1200, items = 12, size = 48 }) => (
  <BasicSpinner
    animation="roller"
    duration={duration}
    items={items}
    size={size}
    delay={duration / items}
    getXY={({ index, items, size }) => {
      const r = size / 2
      const angle = (index / items) * Math.PI * 2
      return [Math.cos(angle), Math.sin(angle)].map(v => r + r * v)
    }}
    itemWidth={size / 8}
    itemHeight={size / 8}
    __css={{
      '& > div': {
        background: '#3333ee',
        borderRadius: '50%',
        animationTimingFunction: 'linear',
      },
    }}
  />
)
