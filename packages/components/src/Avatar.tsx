import React from 'react'
import { Image, ImageProps } from './Image'
import { ForwardRef } from './Box'

interface AvatarProps extends ImageProps {
  size?: number | string
}

export const Avatar: ForwardRef<
  HTMLImageElement,
  AvatarProps
> = React.forwardRef(({ size = 48, ...props }, ref) => (
  <Image
    ref={ref}
    width={size}
    height={size}
    variant="avatar"
    {...props}
    css={{
      borderRadius: 9999,
    }}
  />
))
