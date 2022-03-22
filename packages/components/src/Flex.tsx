import React from 'react'
import { Box, BoxOwnProps, BoxProps } from './Box'
import { ForwardRef } from './types'

export type FlexOwnProps = BoxOwnProps
export type FlexProps = BoxProps

/**
 * Use the Flex component to create flexbox layouts.
 * @see https://theme-ui.com/components/flex
 */
export const Flex: ForwardRef<HTMLElement, FlexProps> = React.forwardRef(
  function Flex(props: FlexProps, ref) {
    return (
      <Box
        ref={ref}
        {...props}
        sx={{
          display: 'flex',
          ...props.sx,
        }}
      />
    )
  }
)
