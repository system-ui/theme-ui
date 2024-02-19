import React from 'react'

import type { ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxOwnProps } from './Box'
import { Label } from './Label'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

const GUTTER = 2
const SIZE = 18

export interface SwitchProps
  extends Assign<React.ComponentPropsWithRef<'input'>, BoxOwnProps> {
  labelPosition?: 'start' | 'end',
  label?: string
}

/**
 * Form switch component
 *
 * Switch variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.switch` variant by default.
 */
export const Switch: ForwardRef<HTMLInputElement, SwitchProps> =
  React.forwardRef(function Switch(
    { className, label, sx, labelPosition = 'end', variant = 'switch', ...rest },
    ref
  ) {
    const __css: ThemeUICSSObject = {
      position: 'relative',
      flexShrink: 0,
      bg: 'gray',
      borderRadius: SIZE,
      height: SIZE + GUTTER * 2,
      width: SIZE * 2 + GUTTER * 2,
      'input:disabled ~ &': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        height: SIZE,
        width: SIZE,
        bg: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transform: 'translateX(0%)',
        transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`,
      },
      'input:checked ~ &': {
        bg: 'primary',
        '> div': {
          transform: 'translateX(100%)',
        },
      },
    }

    // Inner really checkbox (but hidden)
    const reallyHiddenCheckbox = (
      <Box
        ref={ref}
        as="input"
        type="checkbox"
        aria-label={label}
        {...rest}
        sx={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
        {...__internalProps({ __themeKey: 'forms' })}
      />
    );

    // Switch just for show
    const switchForShow = (
      <Box
        css={{ padding: GUTTER }}
        variant={variant}
        className={className}
        sx={sx}
        {...__internalProps({ __themeKey: 'forms', __css })}
      >
        <Box />
      </Box>
    );

    return (
      <Label sx={{ cursor: 'pointer', gap: 2 }}>
        { labelPosition === 'start' && label ? <span>{label}</span> : null }
        {reallyHiddenCheckbox}
        {switchForShow}
        { labelPosition === 'end' && label ? <span>{label}</span> : null }
      </Label>
    )
  })
