import React from 'react'
import Box from './box'

export const Link = React.forwardRef((props, ref) => (
  <Box ref={ref} as="a" {...props} __themeKey="link" />
))
