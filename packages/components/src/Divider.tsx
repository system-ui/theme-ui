import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

export type DividerProps = BoxProps
/**
 * The Divider component reuses styles from `theme.styles.hr` as its default variant.
 */

export const Divider: ForwardRef<
  HTMLDivElement,
  DividerProps
> = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="hr"
    variant="styles.hr"
    {...props}
    css={{
      color: 'gray',
      m: 0,
      my: 2,
      border: 0,
      borderBottom: '1px solid',
    }}
  />
))
