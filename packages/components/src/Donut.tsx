import React from 'react'

import { Box, BoxOwnProps, BoxProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

export interface DonutProps
  extends Assign<
    Omit<
      React.ComponentPropsWithRef<'svg'>,
      'opacity' | 'color' | 'css' | 'sx' | 'max' | 'min'
    >,
    BoxOwnProps
  > {
  value: number
  min?: number
  max?: number
  title?: string
  size?: string | number
}
/**
 * Single value SVG donut chart
 * @see https://theme-ui.com/components/donut/
 */
export const Donut: ForwardRef<SVGSVGElement, DonutProps> = React.forwardRef(
  function Donut(
    {
      size = 128,
      strokeWidth = 2,
      value = 0,
      min = 0,
      max = 1,
      title,
      ...props
    },
    ref
  ) {
    const r =
      16 -
      (typeof strokeWidth === 'number' ? strokeWidth : parseFloat(strokeWidth))
    const C = 2 * r * Math.PI
    const offset = C - ((value - min) / (max - min)) * C

    const svgProps = {
      strokeWidth,

      viewBox: '0 0 32 32',
      width: size,
      height: size,

      fill: 'none',
      stroke: 'currentcolor',
    }

    return (
      <Box
        ref={ref}
        as="svg"
        role="img"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        {...(svgProps as {})}
        {...(props as BoxProps)}
        {...__internalProps({
          __css: { color: 'primary' },
        })}
      >
        {title && <title>{title}</title>}
        <circle cx={16} cy={16} r={r} opacity={1 / 8} />
        <circle
          cx={16}
          cy={16}
          r={r}
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 16 16)"
        />
      </Box>
    )
  }
)
