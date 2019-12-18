import React from 'react'
import Box from './Box'

const thumb = {
  appearance: 'none',
  width: 16,
  height: 16,
  bg: 'currentcolor',
  border: 0,
  borderRadius: 9999,
  variant: 'forms.slider.thumb',
}

export const Slider = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="input"
    type="range"
    variant="slider"
    {...props}
    __themeKey="forms"
    __css={{
      display: 'block',
      width: '100%',
      height: 4,
      my: 2,
      cursor: 'pointer',
      appearance: 'none',
      borderRadius: 9999,
      color: 'inherit',
      bg: 'gray',
      ':focus': {
        outline: 'none',
        color: 'primary',
      },
      '&::-webkit-slider-thumb': thumb,
      '&::-moz-range-thumb': thumb,
      '&::-ms-thumb': thumb,
    }}
  />
))
