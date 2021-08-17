import React from 'react'

import { get } from '@theme-ui/css'

import Box from './Box'
import SVG from './SVG'
import { getMargin, omitMargin } from './util'

const DownArrow = (props) => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
)

export const Select = React.forwardRef(function Select(
  { arrow, ...props },
  ref
) {
  return (
    <Box
      {...getMargin(props)}
      sx={{
        display: 'flex',
      }}>
      <Box
        ref={ref}
        as="select"
        variant="select"
        {...omitMargin(props)}
        __themeKey="forms"
        __css={{
          display: 'block',
          width: '100%',
          p: 2,
          appearance: 'none',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          border: '1px solid',
          borderRadius: 4,
          color: 'inherit',
          backgroundColor: (theme) => get(theme, 'colors.background', null),
        }}
      />
      {arrow || (
        <DownArrow
          sx={{
            ml: -28,
            alignSelf: 'center',
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  )
})
