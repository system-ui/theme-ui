import React from 'react'

import { Box, BoxProps } from './Box'
import type { ForwardRef } from './types'

export type DividerProps = BoxProps

/**
 * The Divider component reuses styles from `theme.styles.hr` as its default variant.
 */
export const Divider: ForwardRef<HTMLDivElement, DividerProps> =
  React.forwardRef(function Divider(props, ref) {
    return (
      <Box
        ref={ref}
        as="hr"
        variant="styles.hr"
        {...props}
        // @ts-expect-error
        __css={{
          color: 'gray',
          m: 0,
          my: 2,
          border: 0,
          borderBottom: '1px solid',
        }}
      />
    )
  })
