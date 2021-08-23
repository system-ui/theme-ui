import React from 'react'
import Box from './Box'

export const Heading = React.forwardRef(function Heading(props, ref) {
  return (
    <Box
      ref={ref}
      as="h2"
      variant="heading"
      {...props}
      // @ts-expect-error
      __themeKey="text"
      __css={{
        fontFamily: 'heading',
        fontWeight: 'heading',
        lineHeight: 'heading',
      }}
    />
  )
})
