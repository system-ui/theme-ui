import React from 'react'
import { AspectRatio } from './AspectRatio'
import { Image, ImageProps } from './Image'
import { ForwardRef } from './Box'

interface AspectImageProps extends ImageProps {
  ratio?: number
}
/**
 * Image component constrained by as aspect ratio.
 * @see https://theme-ui.com/components/aspect-image
 */

export const AspectImage: ForwardRef<
  HTMLImageElement,
  AspectImageProps
> = React.forwardRef(({ ratio, ...props }, ref) => (
  <AspectRatio ratio={ratio}>
    <Image
      ref={ref}
      {...props}
      __css={{
        objectFit: 'cover',
      }}
    />
  </AspectRatio>
))
