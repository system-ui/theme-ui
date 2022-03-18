import React from 'react'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps, __ThemeUIComponentsInternalProps } from './util'

export interface ImageProps
  extends Assign<React.ComponentPropsWithRef<'img'>, BoxOwnProps> {}

/**
 * Image style variants can be defined in the theme.images object.
 * @see https://theme-ui.com/components/image/
 */
export const Image: ForwardRef<HTMLImageElement, ImageProps> = React.forwardRef(
  function Image(props, ref) {
    const __outerCss = (props as __ThemeUIComponentsInternalProps).__css

    return (
      <Box
        ref={ref}
        as="img"
        {...props}
        {...__internalProps({
          __themeKey: 'images',
          __css: {
            maxWidth: '100%',
            height: 'auto',
            ...__outerCss,
          },
        })}
      />
    )
  }
)
