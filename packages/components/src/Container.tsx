import React from 'react'

import { Box, BoxProps } from './Box'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export type ContainerProps = BoxProps

/**
 * Centered, max-width layout component
 *
 * Container variants can be defined in the `theme.layout` object.
 * The Container component uses `theme.layout.container` as its default variant style.
 * @see https://theme-ui.com/components/container
 */
export const Container: ForwardRef<HTMLDivElement, ContainerProps> =
  React.forwardRef(function Container(props, ref) {
    return (
      <Box
        ref={ref}
        variant="container"
        {...props}
        {...__internalProps({
          __themeKey: 'layout',
          __css: {
            width: '100%',
            maxWidth: 'container',
            mx: 'auto',
          },
        })}
      />
    )
  })
