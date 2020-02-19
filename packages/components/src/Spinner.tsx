import React from 'react'
import { keyframes } from '@emotion/core'
import Box, { BoxOwnProps, ForwardRef, Omit } from './Box'

export interface SpinnerProps
  extends Omit<
      React.SVGProps<SVGSVGElement>,
      'opacity' | 'color' | 'css' | 'sx'
    >,
    BoxOwnProps {
  size?: number | string
  title?: string
  duration?: number
  strokeWidth?: number
}

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export const Spinner: ForwardRef<
  SVGSVGElement,
  SpinnerProps
> = React.forwardRef(
  (
    {
      size = 48,
      strokeWidth = 4,
      max = 1,
      title = 'Loading...',
      duration = 500,
      ...props
    },
    ref
  ) => {
    const r = 16 - strokeWidth
    const C = 2 * r * Math.PI
    const offset = C - (1 / 4) * C

    return (
      <Box
        ref={ref} //TODO
        as="svg"
        viewBox="0 0 32 32"
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="currentcolor"
        role="img"
        {...props}
        css={{
          color: 'primary',
          overflow: 'visible',
        }}>
        <title>{title}</title>
        <circle cx={16} cy={16} r={r} opacity={1 / 8} />
        <Box
          as="circle"
          cx={16} // TODO
          cy={16}
          r={r}
          strokeDasharray={C}
          strokeDashoffset={offset}
          css={{
            transformOrigin: '50% 50%',
            animationName: spin.toString(),
            animationTimingFunction: 'linear',
            animationDuration: duration + 'ms',
            animationIterationCount: 'infinite',
          }}
        />
      </Box>
    )
  }
)
