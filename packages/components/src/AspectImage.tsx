import React from 'react'

import { AspectRatio } from './AspectRatio'
import { Image, ImageProps } from './Image'
import type { ForwardRef } from './types'
import { __internalProps } from './util'

export interface AspectImageProps extends ImageProps {
  ratio?: number
}
/**
 * Image component constrained by as aspect ratio.
 * @see https://theme-ui.com/components/aspect-image
 */
export const AspectImage: ForwardRef<HTMLImageElement, AspectImageProps> =
  React.forwardRef(function AspectImage({ ratio, ...props }, ref) {
    return (
      <AspectRatio ratio={ratio}>
        <Image
          ref={ref}
          {...props}
          {...__internalProps({
            __css: {
              objectFit: 'cover',
            },
          })}
        />
      </AspectRatio>
    )
  })
