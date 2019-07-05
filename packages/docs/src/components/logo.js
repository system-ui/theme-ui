import React from 'react'
import theme from '../gatsby-plugin-theme-ui'

export default ({ size = 512, color = theme.colors.primary, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 48 48"
    width={size}
    height={size}
    overflow="visible">
    <path
      fill={color}
      d={`
      M 24 0
      A 24 24 0 0 0 24 48
      A 24 24 0 0 0 24 0
      M 24 14
      H 38
      V 22
      H 28
      V 38
      H 20
      V 22
      H 10
      V 14
      z
    `}
    />
  </svg>
)
