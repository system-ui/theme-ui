import React from 'react'
import Box from './Box'

export const Paragraph = React.forwardRef(function Paragraph(
  props,
  ref
) {
  return (
    <Box
      ref={ref}
      as="p"
      variant="paragraph"
      // reset margin by default: avoid relying on user-agent margins (not aware of theme-ui space scale)
      m={0}
      __themeKey="text"
      __css={{
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      }}
      {...props}
    />
  )
})
