import React from 'react'
import type { ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxOwnProps, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export interface SpinnerProps
  extends Omit<
      React.ComponentPropsWithRef<'svg'>,
      'opacity' | 'color' | 'css' | 'sx' | 'strokeWidth'
    >,
    BoxOwnProps {
  size?: number
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
      title = 'Loading',
      duration = 750,
      ...props
    },
    ref
  ) {
    const __css: ThemeUICSSObject = {
      color: 'primary',
      overflow: 'visible',
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

    const circleProps = {
      strokeWidth,
      r: 16 - strokeWidth,
      cx: 16,
      cy: 16,
      fill: 'none',
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
        <circle {...circleProps} opacity={1 / 8} />
        <circle {...circleProps} strokeDasharray="20 110">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 16 16"
            to="360 16 16"
            dur={`${duration}ms`}
            repeatCount="indefinite"
          />
        </circle>
      </Box>
    )
  })
