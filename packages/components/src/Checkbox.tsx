import React from 'react'

import { Box, BoxOwnProps } from './Box'
import { SVG, SVGProps } from './SVG'
import { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

const CheckboxChecked = (props: SVGProps) => (
  <SVG {...props}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </SVG>
)

const CheckboxIndeterminate = (props: SVGProps) => (
  <SVG {...props}>
    <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z" />
  </SVG>
)

const CheckboxUnchecked = (props: SVGProps) => (
  <SVG {...props}>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SVG>
)

export interface CheckboxIconProps extends SVGProps {
  indeterminate?: boolean
}

const CheckboxIcon = (props: CheckboxIconProps) => {
  const Component = props.indeterminate
    ? CheckboxIndeterminate
    : CheckboxChecked
  return (
    <React.Fragment>
      <Component
        {...props}
        {...__internalProps({
          __css: {
            display: 'none',
            'input:checked ~ &': {
              display: 'block',
            },
          },
        })}
      />
      <CheckboxUnchecked
        {...props}
        {...__internalProps({
          __css: {
            display: 'block',
            'input:checked ~ &': {
              display: 'none',
            },
          },
        })}
      />
    </React.Fragment>
  )
}

export interface CheckboxProps
  extends Assign<React.ComponentPropsWithRef<'input'>, BoxOwnProps> {
  indeterminate?: boolean
}

/**
 * Form checkbox input component
 *
 * Checkbox variants can be defined in `theme.forms` and the
 * component uses the `theme.forms.checkbox` variant by default.
 * @see https://theme-ui.com/components/checkbox/
 */
export const Checkbox: ForwardRef<HTMLInputElement, CheckboxProps> =
  React.forwardRef(function Checkbox(
    { className, sx, variant = 'checkbox', indeterminate, children, ...props },
    ref
  ) {
    return (
      <Box sx={{ minWidth: 'min-content' }}>
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
          as={(SVGProps) => CheckboxIcon({ indeterminate, ...SVGProps })}
          aria-hidden="true"
          variant={variant}
          className={className}
          sx={sx}
          {...__internalProps({
            __themeKey: 'forms',
            __css: {
              mr: 2,
              borderRadius: 4,
              color: 'gray',
              flexShrink: 0,
              'input:checked ~ &': {
                color: 'primary',
              },
              'input:focus ~ &': {
                color: 'primary',
                bg: 'highlight',
              },
            },
          })}
        />
        {children}
      </Box>
    )
  })
