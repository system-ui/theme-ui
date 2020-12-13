import React from 'react'
import { AspectRatio } from './AspectRatio'
import { Image } from './Image'

export const AspectImage = React.forwardRef(function AspectImage(
  { ratio, ...props },
  ref
) {
  return (
    <AspectRatio ratio={ratio}>
      <Image
        ref={ref}
        {...props}
        __css={{
          objectFit: 'cover',
        }}
      />
    </AspectRatio>
  )
})
