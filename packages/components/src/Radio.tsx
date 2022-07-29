import React from 'react'

import { Box, BoxOwnProps } from './Box'
import { SVG, SVGProps } from './SVG'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

const RadioChecked = (props: SVGProps) => (
  <SVG {...props}>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
)

const RadioUnchecked = (props: SVGProps) => (
  <SVG {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
)

const RadioIcon = (props: SVGProps) => (
  <React.Fragment>
    <RadioChecked
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
    <RadioUnchecked
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

export interface RadioProps
  extends Assign<React.ComponentPropsWithRef<'input'>, BoxOwnProps> {}
/**
 * Form radio input component
 *
 * Radio variants can be defined in `theme.forms` and the
 * component uses the `theme.forms.radio variant` by default.
 * @see https://theme-ui.com/components/radio/
 */
export const Radio: ForwardRef<HTMLInputElement, RadioProps> = React.forwardRef(
  function Radio({ className, sx, variant = 'radio', ...props }, ref) {
    return (
      <Box sx={{ minWidth: 'min-content' }}>
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
          variant={variant}
          className={className}
          sx={sx}
          {...__internalProps({
            __themeKey: 'forms',
            __css: {
              mr: 2,
              borderRadius: 9999,
              color: 'gray',
              flexShrink: 0,
              'input:checked ~ &': {
                color: 'primary',
              },
              'input:focus ~ &': {
                bg: 'highlight',
              },
            },
          })}
        />
      </Box>
    )
  }
)
