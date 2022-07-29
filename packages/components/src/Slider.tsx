import React from 'react'

import { ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxOwnProps } from './Box'
import { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

const thumbStyle: ThemeUICSSObject = {
  appearance: 'none',
  width: 16,
  height: 16,
  bg: 'currentcolor',
  border: 0,
  borderRadius: 9999,
  variant: 'forms.slider.thumb',
}

const sliderStyle: ThemeUICSSObject = {
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
  '&::-webkit-slider-thumb': thumbStyle,
  '&::-moz-range-thumb': thumbStyle,
  '&::-ms-thumb': thumbStyle,
}

export interface SliderProps
  extends Assign<React.ComponentPropsWithRef<'input'>, BoxOwnProps> {}

/**
 * Range input element
 *
 * Slider variants can be defined in the `theme.forms` object.
 * The Slider component uses `theme.forms.slider` as its default variant style.
 * @see https://theme-ui.com/components/slider/
 */
export const Slider: ForwardRef<HTMLInputElement, SliderProps> =
  React.forwardRef(function Slider(props, ref) {
    return (
      <Box
        ref={ref}
        as="input"
        type="range"
        variant="slider"
        {...props}
        {...__internalProps({ __themeKey: 'forms', __css: sliderStyle })}
      />
    )
  })
