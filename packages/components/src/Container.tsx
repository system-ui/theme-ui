import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

export type ContainerProps = BoxProps
/**
 * Centered, max-width layout component
 *
 * Container variants can be defined in the `theme.layout` object.
 * The Container component uses `theme.layout.container` as its default variant style.
 * @see https://theme-ui.com/components/container
 */

export const Container: ForwardRef<
  HTMLDivElement,
  ContainerProps
> = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    variant="container"
    {...props}
    __themeKey="layout"
    css={{
      width: '100%',
      maxWidth: 'container',
      mx: 'auto',
    }}
  />
))
