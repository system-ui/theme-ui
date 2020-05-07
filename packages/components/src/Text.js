import React from 'react'
import Box from './Box'

export const Text = React.forwardRef(function Text(props, ref) {
  return (
    <Box
      ref={ref}
      variant="default"
      {...props}
      __themeKey="text"
      __css={{ label: 'Text' }}
    />
  )
})
