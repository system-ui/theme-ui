import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'
import SVG from './SVG'
import { getMargin, omitMargin } from './util'

export interface SelectProps
  extends Assign<React.ComponentProps<'select'>, BoxOwnProps> {}
/**
 * Select variants can be defined in `theme.forms`
 * and the component uses the `theme.forms.select` variant by default.
 * @see https://theme-ui.com/components/select/
 */

const DownArrow = props => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
)

export const Select: ForwardRef<
  HTMLSelectElement,
  SelectProps
> = React.forwardRef((props, ref) => (
  <Box
    {...getMargin(props)}
    sx={{
      display: 'flex',
    }}>
    <Box
      ref={ref} // TODO
      as="select"
      variant="select"
      {...omitMargin(props)}
      __themeKey="forms"
      css={{
        display: 'block',
        width: '100%',
        p: 2,
        appearance: 'none',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        border: '1px solid',
        borderRadius: 4,
        color: 'inherit',
        bg: 'transparent',
      }}
    />
    <DownArrow
      sx={{
        ml: -28,
        alignSelf: 'center',
        pointerEvents: 'none',
      }}
    />
  </Box>
))
