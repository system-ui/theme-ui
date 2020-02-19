import styled from '@emotion/styled'
import { css, get } from '@theme-ui/css'
import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import space from '@styled-system/space'
import color from '@styled-system/color'

import { StyledComponent } from '@emotion/styled'
import { InterpolationWithTheme } from '@emotion/core'
import { SxStyleProp } from 'theme-ui'
import { SpaceProps, ColorProps } from 'styled-system'

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof T
    ? T[P]
    : P extends keyof U
    ? U[P]
    : never
}

export type ForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>

export interface BoxOwnProps extends SpaceProps, ColorProps {
  as?: React.ElementType
  variant?: string
  sx?: SxStyleProp
  css?: InterpolationWithTheme<any>
  __themeKey?: string //TODO is __themeKey a "keyof / typeof" from the theme spec?
}

export interface BoxProps
  extends Assign<React.ComponentProps<'div'>, BoxOwnProps> {}

/**
 * Use the Box component as a layout primitive to add margin, padding, and colors to content.
 * @see https://theme-ui.com/components/box
 */

const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
])

const sx = props => css(props.sx)(props.theme)
const base = props => css(props.__css)(props.theme)
const variant = ({ theme, variant, __themeKey = 'variants' }) =>
  css(get(theme, __themeKey + '.' + variant, get(theme, variant)))

export const Box: StyledComponent<
  React.ComponentProps<'div'>,
  BoxOwnProps,
  {}
> = styled('div', {
  shouldForwardProp,
})(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  base,
  variant,
  space,
  color,
  sx,
  props => props.css
)

export default Box
