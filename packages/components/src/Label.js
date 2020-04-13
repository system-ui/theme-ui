import React from 'react'
import Box from './Box'

export const Label = React.forwardRef(function Label(props, ref) {
  return (
    <Box
      ref={ref}
      as="label"
      variant="label"
      {...props}
      __themeKey="forms"
      __css={{
        label: 'Label',
        width: '100%',
        display: 'flex',
      }}
    />
  )
})
