import React, { SVGAttributes } from 'react'
import { keyframes } from '@emotion/react'

import type { ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxOwnProps, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export interface SpinnerProps
  extends Omit<
      React.ComponentPropsWithRef<'svg'>,
      'opacity' | 'color' | 'css' | 'sx' | 'strokeWidth'
    >,
    BoxOwnProps {
  size?: number | string
  strokeWidth?: number
  title?: string
  duration?: number
}

export const Spinner: ForwardRef<SVGSVGElement, SpinnerProps> =
  React.forwardRef(function Spinner(
    {
      size = 48,
      strokeWidth = 4,
      max = 1,
      title = 'Loading...',
      duration = 500,
      ...props
    },
    ref
  ) {
    const r = 16 - strokeWidth
    const C = 2 * r * Math.PI
    const offset = C - (1 / 4) * C

    const __css: ThemeUICSSObject = {
      color: 'primary',
      overflow: 'visible',
    }

    const circleProps: SVGAttributes<SVGCircleElement> = {
      cx: 16,
      cy: 16,
      r,
      strokeDasharray: C,
      strokeDashoffset: offset,
    }

    const __circleCss: ThemeUICSSObject = {
      transformOrigin: '50% 50%',
      animationName: spin.toString(),
      animationTimingFunction: 'linear',
      animationDuration: duration + 'ms',
      animationIterationCount: 'infinite',
    }

    const svgProps = {
      strokeWidth,

      viewBox: '0 0 32 32',
      width: size,
      height: size,

      fill: 'none',
      stroke: 'currentColor',
      role: 'img',
    }

    return (
      <Box
        ref={ref}
        as="svg"
        {...(svgProps as {})}
        {...(props as BoxProps)}
        {...__internalProps({ __css })}
      >
        <title>{title}</title>
        <circle cx={16} cy={16} r={r} opacity={1 / 8} />
        <Box
          as="circle"
          {...(circleProps as {})}
          {...__internalProps({
            __css: __circleCss,
          })}
        />
      </Box>
    )
  })
