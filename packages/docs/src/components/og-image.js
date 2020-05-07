import React from 'react'
import Logo from './logo'

export default ({ width = 1280, height = 720 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1280 720"
    width={width}
    height={height}
    style={{
      display: 'block',
      color: 'white',
      width,
      height,
    }}>
    <rect width="1280" height="720" fill="black" />
    <g transform="translate(512 232)">
      <Logo />
    </g>
  </svg>
)
