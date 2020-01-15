import React from 'react'
import Box from './Box'
import SVG from './SVG'
import { getMargin, omitMargin } from './util'

const DownArrow = props => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
)

export const Select = React.forwardRef((props, ref) => (
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
        bg: 'transparent',
      }}
    />
    <DownArrow
      sx={{
        ml: -28,
        alignSelf: 'center',
        pointerEvents: 'none',
      }}
    />
  </Box>
))
