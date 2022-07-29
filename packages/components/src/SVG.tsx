import React, { SVGAttributes } from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

export interface SVGProps
  extends Assign<SVGAttributes<SVGElement>, BoxOwnProps> {
  size?: number | string
}

export const SVG: ForwardRef<SVGSVGElement, SVGProps> = React.forwardRef(
  function SVG({ size = 24, ...rest }, ref) {
    const svgProps: SVGProps = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentcolor',
      ...rest,
    }

    return <Box ref={ref} as="svg" {...(svgProps as {})} />
  }
)

SVG.displayName = 'SVG'
