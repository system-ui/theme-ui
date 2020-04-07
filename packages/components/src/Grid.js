/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import { useVariant } from './util'

const px = n => (typeof n === 'number' ? n + 'px' : n)

const widthToColumns = width =>
  Array.isArray(width)
    ? width.map(widthToColumns)
    : !!width && `repeat(auto-fit, minmax(${px(width)}, 1fr))`

const countToColumns = n =>
  Array.isArray(n)
    ? n.map(countToColumns)
    : !!n && (typeof n === 'number' ? `repeat(${n}, 1fr)` : n)

export const Grid = React.forwardRef(function Grid(
  { width, columns, gap = 3, variant, ...props },
  ref
) {
  const gridTemplateColumns = !!width
    ? widthToColumns(width)
    : countToColumns(columns)

  const variantStyle = useVariant('grids', variant)

  return (
    <Box
      ref={ref}
      {...props}
      __css={{
        display: 'grid',
        gridGap: gap,
        gridTemplateColumns,
        ...variantStyle,
      }}
    />
  )
})
