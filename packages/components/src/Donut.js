import React from 'react'
import Box from './Box'

export const Donut = React.forwardRef(({
  size = 128,
  strokeWidth = 4,
  value = 0,
  ...props
}, ref) => {
  const r = 16 - (strokeWidth / 2)
  const n = 2 * Math.PI * r
  const offset = n - (value * n)

  return (
    <Box
      ref={ref}
      as='svg'
      viewBox='0 0 32 32'
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      stroke='currentcolor'
      fill='none'
      {...props}
      __css={{
        color: 'primary',
      }}>
      <circle
        cx={16}
        cy={16}
        r={r}
        opacity={1/8}
        stroke='#eee'
      />
      <circle
        cx={16}
        cy={16}
        r={r}
        strokeWidth={strokeWidth}
        strokeDashArray={n}
        strokeDashOffset={offset}
        transform='rotate(-90 16 16)'
      />
    </Box>
  )
})
