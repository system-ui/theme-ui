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

const animations = { spin, roller, facebook }

export const Spinner = props => {
  const {
    animation = 'spin',
    duration = 600,
    width = 48,
    height = 48,
    items = 1,
    delay,
    itemX = () => 0,
    itemY = () => 0,
    itemWidth,
    itemHeight,
  } = props

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
      {range(items).map(index => {
        const cfg = { ...props, index, width, height }
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              display: 'block',
              width: `${itemWidth || width}px`,
              height: `${itemHeight || height}px`,
              animationIterationCount: 'infinite',
              animationName: animations[animation].toString(),
              animationDuration: `${duration}ms`,
              animationDelay: `${(delay || 0) * index}ms`,
              top: `${itemY(cfg)}px`,
              left: `${itemX(cfg)}px`,
            }}
          />
        )
      })}
    </Box>
  )
}

export const DualringSpinner = ({ duration }) => (
  <Spinner
    animation="spin"
    duration={duration}
    delay={-150}
    items={4}
    __css={{
      borderRadius: '50%',
      borderWidth: 6,
      borderStyle: 'solid',
      borderColor: 'rgba(51, 51, 238, 0.1)',
      '& > div': {
        content: '" "',
        borderRadius: '50%',
        left: `-6px`,
        top: `-6px`,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: `#3333ee transparent transparent transparent`,
        animationTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
      },
    }}
  />
)

export const FacebookSpinner = ({ duration, itemWidth, itemHeight }) => (
  <Spinner
    duration={duration}
    items={3}
    itemWidth={itemWidth}
    itemHeight={itemHeight}
    animation="facebook"
    delay={100}
    itemX={({ index, itemWidth }) => (8 + itemWidth) * index}
    __css={{
      '& > div': {
        display: 'inline-block',
        background: '#3333ee',
        animationTimingFunction: 'cubic-bezier(0, 0.5, 0.5, 1)',
      },
    }}
  />
)

export const RollerSpinner = ({ duration, items, itemWidth, itemHeight }) => (
  <Spinner
    duration={duration}
    items={items}
    animation="roller"
    delay={100}
    itemX={({ index, items, width }) => {
      const r = width / 2
      const angle = (index / items) * Math.PI * 2
      return r + r * Math.cos(angle)
    }}
    itemY={({ index, items, height }) => {
      const r = height / 2
      const angle = (index / items) * Math.PI * 2
      return r + r * Math.sin(angle)
    }}
    itemWidth={itemWidth}
    itemHeight={itemHeight}
    __css={{
      '& > div': {
        background: '#3333ee',
        borderRadius: '50%',
        animationTimingFunction: 'linear',
      },
    }}
  />
)
