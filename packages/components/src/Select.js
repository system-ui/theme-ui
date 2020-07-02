/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import SVG from './SVG'
import { getMargin, omitMargin, useVariant } from './util'

const DownArrow = (props) => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
)

export const Select = React.forwardRef(function Select(props, ref) {
  // const variantStyle = useVariant('forms', variant)
  return (
    <Box
      {...getMargin(props)}
      sx={{
        display: 'flex',
      }}>
      <Box
        ref={ref}
        as="select"
        {...omitMargin(props)}
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
          },
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
  )
})
