import React from 'react'
import { Box, BoxOwnProps, BoxProps } from './Box'

export type FlexOwnProps = BoxOwnProps
export type FlexProps = BoxProps

/**
 * Use the Flex component to create flexbox layouts.
 * @see https://theme-ui.com/components/flex
 */
export const Flex = (props: FlexProps) => (
  <Box
    {...props}
    sx={{
      display: 'flex',
      ...props.sx,
    }}
  />
)
