import React from 'react'
import Box from './Box'

export const Text = React.forwardRef((props, ref) => (
  <Box as="span" ref={ref} variant="default" {...props} __themeKey="text" />
))
