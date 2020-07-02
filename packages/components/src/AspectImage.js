/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import { AspectRatio } from './AspectRatio'
import Box from './Box'

export const AspectImage = React.forwardRef(function AspectImage(
  { ratio, ...props },
  ref
) {
  return (
    <AspectRatio ratio={ratio}>
      <Box
        as="img"
        ref={ref}
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
  )
})
