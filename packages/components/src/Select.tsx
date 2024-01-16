import React from 'react'

import { get, ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxOwnProps, BoxProps } from './Box'
import { SVG, SVGProps } from './SVG'
import { __internalProps } from './util'
import type { Assign, ForwardRef } from './types'

const DownArrow = (props: SVGProps) => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
)

export interface SelectProps
  extends Assign<React.ComponentPropsWithRef<'select'>, BoxOwnProps> {
  arrow?: React.ReactElement
  containerSx?: ThemeUICSSObject
}

/**
 * Select variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.select` variant by default.
 * @see https://theme-ui.com/components/select/
 */
export const Select: ForwardRef<HTMLSelectElement, SelectProps> =
  React.forwardRef(function Select({ arrow, containerSx, ...props }, ref) {
    const __css: ThemeUICSSObject = {
      display: 'block',
      width: '100%',
      p: 2,
      paddingRight: 4,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      backgroundColor: (theme) => get(theme, 'colors.background', null),
    }

    return (
      <Box
        sx={{
          display: 'flex',
          ...containerSx,
        }}
      >
        <Box
          ref={ref}
          as="select"
          variant="select"
          {...(props as BoxProps)}
          {...__internalProps({ __themeKey: 'forms', __css })}
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
