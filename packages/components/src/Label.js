import React from 'react'
import Box from './box'

export const Label = React.forwardRef((props, ref) => (
  <Box ref={ref} as="label" variant="label" {...props} __themeKey="forms" />
))
