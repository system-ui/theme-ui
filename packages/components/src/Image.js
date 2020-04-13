import React from 'react'
import Box from './Box'

export const Image = React.forwardRef(function Image(props, ref) {
  return (
    <Box
      ref={ref}
      as="img"
      {...props}
      __themeKey="images"
      __css={{
        label: 'Image',
        maxWidth: '100%',
        height: 'auto',
        ...props.__css,
      }}
    />
  )
})
