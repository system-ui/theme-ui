/** @jsx jsx */
import {
  ArrayInterpolation,
  CSSObject,
  Interpolation,
  jsx,
  useTheme,
} from '@emotion/react'
import React, { forwardRef } from 'react'
import { css, get, ThemeUIStyleObject } from '@theme-ui/css'
import type { Assign } from './types'
import type { __ThemeUIComponentsInternalProps } from './util'

export interface BoxOwnProps {
  as?: React.ElementType
  variant?: string
  css?: Interpolation<any>
  sx?: ThemeUIStyleObject
}

export interface BoxProps
  extends Omit<
    Assign<React.ComponentPropsWithRef<'div'>, BoxOwnProps>,
    'ref'
  > {}

/**
 * Use the Box component as a layout primitive to add margin, padding, and colors to content.
 * @see https://theme-ui.com/components/box
 */
export const Box = forwardRef<any, BoxProps>(function Box(props, ref) {
  const theme = useTheme()

  const {
    __themeKey = 'variants',
    __css,
    variant,
    css: cssProp,
    sx,
    as: Component = 'div',
    ...rest
  } = props as BoxProps & __ThemeUIComponentsInternalProps

  const baseStyles: CSSObject = {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  }

  const __cssStyles = css(__css)(theme)

  const variantInTheme =
    get(theme, `${__themeKey}.${variant}`) || get(theme, variant)
  const variantStyles = variantInTheme && css(variantInTheme)(theme)

  const sxPropStyles = css(sx)(theme)

  const style: ArrayInterpolation<unknown> = [
    baseStyles,
    __cssStyles,
    variantStyles,
    sxPropStyles,
    cssProp,
  ]

  return <Component ref={ref} css={style} {...rest} />
})
