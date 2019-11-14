import React from 'react'
import { AspectRatio } from './AspectRatio'
import { Image } from './Image'

export const AspectImage = React.forwardRef(({
  ratio,
  sx,
  ...props
}, ref) => (
  <AspectRatio
    ratio={ratio}>
    <Image
      ref={ref}
      {...props}
      sx={{
        objectFit: 'cover',
        ...sx,
      }}
    />
  </AspectRatio>
))
