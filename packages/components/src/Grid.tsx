import type {
  ResponsiveStyleValue,
  ThemeUICSSObject,
  ThemeUIEmpty,
} from '@theme-ui/css'
import React from 'react'

import { Box, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

const px = (n: number | string) => (typeof n === 'number' ? n + 'px' : n)

const singleWidthToColumns = (
  width: string | number | ThemeUIEmpty,
  repeat: 'fit' | 'fill'
) => (width ? `repeat(auto-${repeat}, minmax(${px(width)}, 1fr))` : null)

const widthToColumns = (width: GridProps['width'], repeat: 'fit' | 'fill') =>
  Array.isArray(width)
    ? width.map((w) => singleWidthToColumns(w, repeat))
    : singleWidthToColumns(width, repeat)

const singleCountToColumns = (n: number | string | ThemeUIEmpty) =>
  n ? (typeof n === 'number' ? `repeat(${n}, 1fr)` : n) : null

const countToColumns = (n: ResponsiveStyleValue<string | number>) =>
  Array.isArray(n) ? n.map(singleCountToColumns) : singleCountToColumns(n)

export interface GridProps extends BoxProps {
  /**
   * Minimum width of child elements
   */
  width?: ResponsiveStyleValue<string | number>
  /**
   * 	Number of columns to use for the layout (cannot be used in conjunction with the width prop)
   */
  columns?: ResponsiveStyleValue<string | number>
  /**
   * Space between child elements
   */
  gap?: ResponsiveStyleValue<string | number>
  /**
   * Auto-repeat track behaviour (default is fit)
   */
  repeat?: 'fit' | 'fill'
}

/**
 * CSS grid layout component to arrange direct child elements in a tiled grid layout.
 * @see https://theme-ui.com/components/grid
 */
export const Grid: ForwardRef<HTMLDivElement, GridProps> = React.forwardRef(
  function Grid({ width, columns, gap = 3, repeat = 'fit', ...props }, ref) {
    const gridTemplateColumns = !!width
      ? widthToColumns(width, repeat)
      : countToColumns(columns)

    const __css: ThemeUICSSObject = {
      display: 'grid',
      gridGap: gap,
      gridTemplateColumns,
    }

    return (
      <Box
        ref={ref}
        {...props}
        {...__internalProps({
          __themeKey: 'grids',
          __css,
        })}
      />
    )
  }
)
