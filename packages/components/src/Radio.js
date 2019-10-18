import React from 'react'
import Box from './Box'
import SVG from './SVG'

const RadioChecked = props => (
  <SVG {...props}>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
)

const RadioUnchecked = props => (
  <SVG {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
)

const RadioIcon = props => (
  <React.Fragment>
    <RadioChecked
      {...props}
      __css={{
        display: 'none',
        'input:checked ~ &': {
          display: 'block',
        },
      }}
    />
    <RadioUnchecked
      {...props}
      __css={{
        display: 'block',
        'input:checked ~ &': {
          display: 'none',
        },
      }}
    />
  </React.Fragment>
)

export const Radio = React.forwardRef(
  ({ className, sx, variant = 'radio', ...props }, ref) => (
    <Box>
      <Box
        ref={ref}
        as="input"
        type="radio"
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
        __themeKey="forms"
        variant={variant}
        className={className}
        sx={sx}
        __css={{
          // todo: system props??
          mr: 2,
          borderRadius: 9999,
          color: 'gray',
          'input:checked ~ &': {
            color: 'primary',
          },
          'input:focus ~ &': {
            bg: 'highlight',
          },
        }}
      />
    </Box>
  )
)
