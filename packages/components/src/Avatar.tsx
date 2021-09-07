import React from 'react'

import { Image, ImageProps } from './Image'
import type { ForwardRef } from './types'

export interface AvatarProps extends ImageProps {
  size?: number | string
}

export const Avatar: ForwardRef<HTMLImageElement, AvatarProps> =
  React.forwardRef(function Avatar({ size = 48, ...props }, ref) {
    return (
      <Image
        ref={ref}
        width={size}
        height={size}
        variant="avatar"
        {...props}
        // @ts-expect-error
        __css={{
          borderRadius: 9999,
        }}
      />
    )
  })
