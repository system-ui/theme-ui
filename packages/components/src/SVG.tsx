import React from 'react'
import Box from './Box'

const SVG = ({ size = 24, ...props }) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    width={size + ''}
    height={size + ''}
    viewBox="0 0 24 24"
    fill="currentcolor"
    {...props}
  />
)

SVG.displayName = 'SVG'

export default SVG
