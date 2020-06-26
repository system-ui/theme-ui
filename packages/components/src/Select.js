import React from 'react'
import Box from './Box'
import SVG from './SVG'

const DownArrow = (props) => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
)

// TODO BREAKING nested styling (sx + variants)
export const Select = React.forwardRef(
  ({ sx = {}, variant = 'select', ...props }, ref) => (
    <Box
      variant={variant}
      config={{
        group: 'forms',
      }}
      sx={{
        display: 'flex',
        ...sx,
      }}>
      <Box
        ref={ref}
        as="select"
        variant={variant + '.select'}
        {...props}
        config={{
          group: 'forms',
          sx: {
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
            ...sx.select,
          },
        }}
      />
      <DownArrow
        variant={variant + '.arrow'}
        config={{
          group: 'forms',
          sx: {
            ml: -28,
            alignSelf: 'center',
            pointerEvents: 'none',
          },
        }}
        sx={{
          ...sx.arrow,
        }}
      />
    </Box>
  )
)
