import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

export interface ImageProps
  extends Assign<React.ComponentPropsWithRef<'img'>, BoxOwnProps> {}

/**
 * Image style variants can be defined in the theme.images object.
 * @see https://theme-ui.com/components/image/
 */
export const Image: ForwardRef<HTMLImageElement, ImageProps> = React.forwardRef(
  function Image(props, ref) {
    return (
      <Box
        ref={ref}
        as="img"
        {...props}
        // @ts-expect-error
        __themeKey="images"
        __css={{
          maxWidth: '100%',
          height: 'auto',
          // @ts-expect-error
          ...props.__css,
        }}
      />
    )
  }
)
