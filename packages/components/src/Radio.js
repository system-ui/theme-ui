/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'
import SVG from './SVG'

const RadioChecked = (props) => (
  <SVG {...props}>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
)

const RadioUnchecked = (props) => (
  <SVG {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
)

const RadioIcon = (props) => (
  <React.Fragment>
    <RadioChecked
      {...props}
      sx={{
        display: 'none',
        'input:checked ~ &': {
          display: 'block',
        },
      }}
    />
    <RadioUnchecked
      {...props}
      sx={{
        display: 'block',
        'input:checked ~ &': {
          display: 'none',
        },
      }}
    />
  </React.Fragment>
)

export const Radio = React.forwardRef(function Radio(
  { className, sx, variant = 'radio', ...props },
  ref
) {
  return (
    <Box sx={variantStyle.container}>
      <Box
        ref={ref}
        as="input"
        type="radio"
        variant="radio"
        {...props}
        sx={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      />
      <Box
        as={RadioIcon}
        aria-hidden="true"
        className={className}
        variant={variant}
        config={{
          group: 'forms',
          sx: {
            mr: 2,
            borderRadius: 9999,
            color: 'gray',
            'input:checked ~ &': {
              color: 'primary',
            },
            'input:focus ~ &': {
              bg: 'highlight',
            },
          },
        }}
      />
    </Box>
  )
})
