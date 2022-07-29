/** @jsx jsx */
import {
  ArrayInterpolation,
  CSSObject,
  Interpolation,
  jsx,
  useTheme,
} from '@emotion/react'
import React, { forwardRef } from 'react'
import {
  css,
  get,
  ThemeUICSSProperties,
  ThemeUIStyleObject,
} from '@theme-ui/css'
import type { Assign } from './types'
import type { __ThemeUIComponentsInternalProps } from './util'

const boxSystemProps = [
  // space scale props (inherited from @styled-system/space)
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  // color props (inherited from @styled-system/color)
  'color',
  'backgroundColor',
  'bg',
  'opacity',
] as const

type BoxSystemPropsKeys = typeof boxSystemProps[number]
type BoxSystemProps = Pick<ThemeUICSSProperties, BoxSystemPropsKeys>

export interface BoxOwnProps extends BoxSystemProps {
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
 * @internal
 */
export const __isBoxStyledSystemProp = (prop: string) =>
  (boxSystemProps as readonly string[]).includes(prop)

const pickSystemProps = (props: BoxOwnProps) => {
  const res: Partial<Pick<BoxOwnProps, typeof boxSystemProps[number]>> = {}
  for (const key of boxSystemProps) {
    // ts2590: union is too large
    ;(res as any)[key] = props[key]
  }

  return res
}

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

  const systemPropsStyles = css(pickSystemProps(rest))(theme)

  const style: ArrayInterpolation<unknown> = [
    baseStyles,
    __cssStyles,
    variantStyles,
    sxPropStyles,
    systemPropsStyles,
    cssProp,
  ]

  boxSystemProps.forEach((name) => {
    delete (rest as Record<string, unknown>)[name]
  })

  return <Component ref={ref} css={style} {...rest} />
})
