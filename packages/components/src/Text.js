import React from 'react'
import Box from './Box'

export const Text = React.forwardRef(function Text(props, ref) {
  return <Box ref={ref} {...props} __themeKey="text" />
})
