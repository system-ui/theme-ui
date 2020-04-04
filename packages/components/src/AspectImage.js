/** @jsx jsx */
import { jsx } from '@theme-ui/core'
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
        sx={{
          objectFit: 'cover',
        }}
      />
    </AspectRatio>
  )
})
