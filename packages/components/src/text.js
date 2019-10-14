import React from 'react'
import Box from './box'

export const Text = React.forwardRef((props, ref) => (
  <Box ref={ref} {...props} __themeKey="text" />
))
