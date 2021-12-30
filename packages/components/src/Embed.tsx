import React from 'react'

import { Box, BoxOwnProps, __isBoxStyledSystemProp } from './Box'
import { Assign, ForwardRef } from './types'
import { getProps } from './util'

const getContainerProps = getProps(__isBoxStyledSystemProp)
const getIframeProps = getProps((str) => !__isBoxStyledSystemProp(str))

export interface EmbedProps
  extends Assign<React.ComponentPropsWithRef<'iframe'>, BoxOwnProps> {
  variant?: string
  ratio?: number
  src?: React.IframeHTMLAttributes<any>['src']
  frameBorder?: React.IframeHTMLAttributes<any>['frameBorder']
  allowFullScreen?: React.IframeHTMLAttributes<any>['allowFullScreen']
  allow?: React.IframeHTMLAttributes<any>['allow']
}

/**
 * Responsive iframe for video embeds.
 *
 * Embed variants can be defined anywhere in the theme object.
 *
 * @see https://theme-ui.com/components/embed
 */
export const Embed: ForwardRef<HTMLIFrameElement, EmbedProps> =
  React.forwardRef(function Embed(
    {
      variant,
      sx,
      ratio = 16 / 9,
      src,
      frameBorder = 0,
      allowFullScreen = true,
      width = 560,
      height = 315,
      allow,
      ...rest
    },
    ref
  ) {
    return (
      <Box
        variant={variant}
        sx={sx}
        // @ts-expect-error
        __css={{
          width: '100%',
          height: 0,
          paddingBottom: 100 / ratio + '%',
          position: 'relative',
          overflow: 'hidden',
        }}
        {...getContainerProps(rest)}>
        <Box
          ref={ref}
          as="iframe"
          src={src}
          width={width}
          height={height}
          frameBorder={frameBorder}
          allowFullScreen={allowFullScreen}
          allow={allow}
          {...getIframeProps(rest)}
          // @ts-expect-error
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
  })
