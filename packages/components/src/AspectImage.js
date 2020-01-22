import React from 'react'
import { AspectRatio } from './AspectRatio'
import { Image } from './Image'

export const AspectImage = React.forwardRef(({ ratio, ...props }, ref) => (
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
