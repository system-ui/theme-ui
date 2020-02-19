import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface SVGProps
  extends Assign<React.ComponentProps<'svg'>, BoxOwnProps> {
  size?: number | string
}

const SVG: ForwardRef<HTMLOrSVGElement, SVGProps> = React.forwardRef(
  ({ size = 24, ...props }) => (
    <Box
      as="svg" //TODO
      xmlns="http://www.w3.org/2000/svg"
      width={size + ''}
      height={size + ''}
      viewBox="0 0 24 24"
      fill="currentcolor"
      {...props}
    />
  )
)

export default SVG
