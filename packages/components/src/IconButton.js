import React from 'react'
import Box from './Box'

export const IconButton = React.forwardRef(function IconButton(
  { size = 32, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      as="button"
      variant="icon"
      {...props}
      __themeKey="buttons"
      __css={{
        label: props.__css?.label || 'IconButton',
        appearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        width: size,
        height: size,
        color: 'inherit',
        bg: 'transparent',
        border: 'none',
        borderRadius: 4,
      }}
    />
  )
})
