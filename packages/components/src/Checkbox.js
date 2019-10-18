import React from 'react'
import Box from './Box'
import SVG from './SVG'

const CheckboxChecked = props => (
  <SVG {...props}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </SVG>
)

const CheckboxUnchecked = props => (
  <SVG {...props}>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SVG>
)

const CheckboxIcon = props => (
  <React.Fragment>
    <CheckboxChecked
      {...props}
      __css={{
        display: 'none',
        'input:checked ~ &': {
          display: 'block',
        },
      }}
    />
    <CheckboxUnchecked
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

export const Checkbox = React.forwardRef(
  ({ className, sx, variant = 'checkbox', ...props }, ref) => (
    <Box>
      <Box
        ref={ref}
        as="input"
        type="checkbox"
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
        as={CheckboxIcon}
        aria-hidden="true"
        __themeKey="forms"
        variant={variant}
        className={className}
        sx={sx}
        __css={{
          mr: 2,
          borderRadius: 4,
          color: 'gray',
          'input:checked ~ &': {
            color: 'primary',
          },
          'input:focus ~ &': {
            color: 'primary',
            bg: 'highlight',
          },
        }}
      />
    </Box>
  )
)
