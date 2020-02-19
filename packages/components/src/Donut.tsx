import React from 'react'
import Box, { BoxOwnProps, ForwardRef } from './Box'

export interface DonutProps
  extends Omit<
      React.SVGProps<SVGSVGElement>,
      'opacity' | 'color' | 'css' | 'sx' | 'max' | 'min'
    >,
    BoxOwnProps {
  size?: string | number
  strokeWidth?: number
  value: number
  min?: number
  max?: number
  title?: string
}
/**
 * Single value SVG donut chart
 * @see https://theme-ui.com/components/donut/
 */

export const Donut: ForwardRef<SVGSVGElement, DonutProps> = React.forwardRef(
  (
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
  ) => {
    const r = 16 - strokeWidth
    const C = 2 * r * Math.PI
    const offset = C - ((value - min) / (max - min)) * C

    return (
      <Box
        ref={ref} // TODO
        as="svg"
        viewBox="0 0 32 32"
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="currentcolor"
        role="img"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        {...props}
        __css={{
          color: 'primary',
        }}>
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
