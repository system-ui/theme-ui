import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

export interface GridProps extends BoxProps {
  /**
   * Minimum width of child elements
   */
  width?: string | number
  /**
   * 	Number of columns to use for the layout (cannot be used in conjunction with the width prop)
   */
  columns?: number
  /**
   * Space between child elements
   */
  gap?: string | number
}
/**
 * CSS grid layout component to arrange direct child elements in a tiled grid layout.
 * @see https://theme-ui.com/components/grid
 */

const px = n => (typeof n === 'number' ? n + 'px' : n)

const widthToColumns = (width: string | number) =>
  Array.isArray(width)
    ? width.map(widthToColumns)
    : !!width && `repeat(auto-fit, minmax(${px(width)}, 1fr))`

const countToColumns = (n: number) =>
  Array.isArray(n)
    ? n.map(countToColumns)
    : !!n && (typeof n === 'number' ? `repeat(${n}, 1fr)` : n)

export const Grid: ForwardRef<HTMLDivElement, GridProps> = React.forwardRef(
  ({ width, columns, gap = 3, ...props }: GridProps, ref) => {
    const gridTemplateColumns = !!width
      ? widthToColumns(width)
      : countToColumns(columns)

    return (
      <Box
        ref={ref}
        {...props}
        __themeKey="grids"
        css={{
          display: 'grid',
          gridGap: gap,
          gridTemplateColumns,
        }}
      />
    )
  }
)
