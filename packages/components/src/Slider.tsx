import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface SliderProps
  extends Assign<React.ComponentProps<'input'>, BoxOwnProps> {}
/**
 * Range input element
 *
 * Slider variants can be defined in the `theme.forms` object.
 * The Slider component uses `theme.forms.slider` as its default variant style.
 * @see https://theme-ui.com/components/slider/
 */

const thumb = {
  appearance: 'none',
  width: 16,
  height: 16,
  bg: 'currentcolor',
  border: 0,
  borderRadius: 9999,
  variant: 'forms.slider.thumb',
}

export const Slider: ForwardRef<
  HTMLInputElement,
  SliderProps
> = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="input"
    type="range"
    variant="slider"
    {...props}
    __themeKey="forms"
    css={{
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
      '&::-webkit-slider-thumb': thumb, //TODO
      '&::-moz-range-thumb': thumb, //TODO
      '&::-ms-thumb': thumb, //TODO
    }}
  />
))
