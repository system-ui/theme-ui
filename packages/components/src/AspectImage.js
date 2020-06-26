import React from 'react'
import Box from './Box'
import { AspectRatio } from './AspectRatio'

export const AspectImage = React.forwardRef(({ ratio, ...props }, ref) => (
  <AspectRatio ratio={ratio}>
    <Box
      ref={ref}
      as="img"
      {...props}
      config={{
        group: 'images',
        sx: {
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover',
        },
      }}
    />
  </AspectRatio>
))
