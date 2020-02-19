import React from 'react'
import Box, { BoxProps, ForwardRef } from './Box'

export interface EmbedProps extends BoxProps {
  ratio?: number
  src?: React.IframeHTMLAttributes<any>['src']
  frameBorder?: React.IframeHTMLAttributes<any>['frameBorder']
  allowFullScreen?: React.IframeHTMLAttributes<any>['allowFullScreen']
  allow?: React.IframeHTMLAttributes<any>['allow']
  width?: number
  height?: number
}
/**
 * Responsive iframe for video embeds.
 *
 * Embed variants can be defined anywhere in the theme object.
 *
 * @see https://theme-ui.com/components/embed
 */

export const Embed: ForwardRef<
  HTMLIFrameElement,
  EmbedProps
> = React.forwardRef(
  (
    {
      ratio = 16 / 9,
      src,
      frameBorder = 0,
      allowFullScreen = true,
      width = 560,
      height = 315,
      allow,
      ...props
    },
    ref
  ) => (
    <Box
      {...props}
      css={{
        width: '100%',
        height: 0,
        paddingBottom: 100 / ratio + '%',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Box
        ref={ref}
        as="iframe"
        src={src} // TODO
        width={width}
        height={height}
        frameBorder={frameBorder}
        allowFullScreen={allowFullScreen}
        allow={allow}
        __css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          bottom: 0,
          left: 0,
          border: 0,
        }}
      />
    </Box>
  )
)
