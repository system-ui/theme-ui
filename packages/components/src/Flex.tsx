import React from 'react'
import { Theme } from '@theme-ui/core'

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
    const { sx } = props
    return (
      <Box
        ref={ref}
        {...props}
        sx={(theme: Theme) => ({
          display: 'flex',
          ...(typeof sx === 'function' ? sx(theme) : sx),
        })}
      />
    )
  }
)
