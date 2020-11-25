import React from 'react'
import Box from './Box'

export const Paragraph = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="p"
    variant="default"
    {...props}
    __themeKey="text"
    __css={{
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    }}
  />
))
