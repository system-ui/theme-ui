import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

interface AspectRatioProps extends BoxProps {
  ratio?: number
}
/**
 * Component for maintaining a fluid-width aspect ratio
 * @see https://theme-ui.com/components/aspect-ratio
 */

export const AspectRatio: ForwardRef<
  HTMLDivElement,
  AspectRatioProps
> = React.forwardRef(({ ratio = 4 / 3, children, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{
      position: 'relative',
      overflow: 'hidden',
    }}>
    <Box
      sx={{
        width: '100%',
        height: 0,
        paddingBottom: 100 / ratio + '%',
      }}
    />
    <Box
      {...props}
      css={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      {children}
    </Box>
  </Box>
))
