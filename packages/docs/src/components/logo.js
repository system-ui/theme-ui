/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import theme from '../gatsby-plugin-theme-ui'

const image =
  'https://contrast.now.sh/cff/40f?size=32&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI'

export default ({ size = 32, ...props }) => (
  <img
    {...props}
    src={image}
    width={size}
    height={size}
    sx={{
      display: 'inline-block',
      width: size,
      height: size,
      ...props.sx,
    }}
  />
)
