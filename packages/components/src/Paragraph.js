import React from 'react'
import Box from './Box'

export const Paragraph = React.forwardRef(function Paragraph(
  { sx, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      as="p"
      variant="paragraph"
      {...props}
      sx={{
        // reset margin by default: avoid relying on user-agent margins (not aware of theme-ui space scale)
        margin: 0,
        // set a max-width: avoid full-page paragraphs
        '@media screen and (min-width: 36em)': {
          maxWidth: '48rem',
        },
        ...sx,
      }}
      __themeKey="text"
      __css={{
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      }}
    />
  )
})
