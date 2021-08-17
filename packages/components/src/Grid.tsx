import React from 'react'
import Box from './Box'

const px = (n) => (typeof n === 'number' ? n + 'px' : n)

const widthToColumns = (width, repeat) =>
  Array.isArray(width)
    ? width.map((w) => widthToColumns(w, repeat))
    : !!width && `repeat(auto-${repeat}, minmax(${px(width)}, 1fr))`

const countToColumns = (n) =>
  Array.isArray(n)
    ? n.map(countToColumns)
    : !!n && (typeof n === 'number' ? `repeat(${n}, 1fr)` : n)

export const Grid = React.forwardRef(function Grid(
  { width, columns, gap = 3, repeat = 'fit', ...props },
  ref
) {
  const gridTemplateColumns = !!width
    ? widthToColumns(width, repeat)
    : countToColumns(columns)

  return (
    <Box
      ref={ref}
      {...props}
      __themeKey="grids"
      __css={{
        display: 'grid',
        gridGap: gap,
        gridTemplateColumns,
      }}
    />
  )
})
