import React from 'react'
import { Image } from './Image'

export const Avatar = React.forwardRef(function Avatar(
  { size = 48, ...props },
  ref
) {
  return (
    <Image
      ref={ref}
      width={size}
      height={size}
      variant="avatar"
      {...props}
      __css={{
        borderRadius: 9999,
      }}
    />
  )
})
