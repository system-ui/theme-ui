import React from 'react'
import Box from './Box'

export const Container = React.forwardRef(function Container(props, ref) {
  return (
    <Box
      ref={ref}
      variant="container"
      {...props}
      __themeKey="layout"
      __css={{
        label: 'Container',
        width: '100%',
        maxWidth: 'container',
        mx: 'auto',
      }}
    />
  )
})
