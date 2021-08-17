import React from 'react'
import Box from './Box'

export const Paragraph = React.forwardRef(function Paragraph(props, ref) {
  return (
    <Box
      ref={ref}
      as="p"
      variant="paragraph"
      __themeKey="text"
      __css={{
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      }}
      {...props}
    />
  )
})
