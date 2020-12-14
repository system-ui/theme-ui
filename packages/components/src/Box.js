/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react'
import React from 'react'
import { css, get } from '@theme-ui/css'
import space from '@styled-system/space'
import color from '@styled-system/color'

const boxSystemProps = [...space.propNames, ...color.propNames]

/**
 * @internal
 * @type {(prop: string) => boolean}
 */
export const __isBoxStyledSystemProp = (prop) => boxSystemProps.includes(prop)

const sx = (props) => css(props.sx)(props.theme)
const base = (props) => css(props.__css)(props.theme)
const variant = ({ theme, variant, __themeKey = 'variants' }) =>
  css(get(theme, __themeKey + '.' + variant, get(theme, variant)))(theme)

const objToArray = (obj) =>
  obj ? Object.keys(obj).map((key) => ({ [key]: obj[key] })) : []

const mergeProps = (props, initial, ...args) => {
  return args.reduce(
    (acc, fn) => [...acc, ...objToArray(fn(props))],
    objToArray(initial)
  )
}
export const Box = React.forwardRef((props, ref) => {
  const theme = useTheme()

  const {
    variant: variantProp,
    __themeKey = 'variants',
    __css,
    css: cssProp,
    sx: sxProp,
    as: Component = 'div',
    ...rest
  } = props

  const style = mergeProps(
    { theme, ...props },
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
    () => cssProp
  )

  internalProps.forEach((name) => {
    delete rest[name]
  })

  return <Component ref={ref} css={style} {...rest} />
})

Box.withComponent =
  (component) =>
  ({ as, ...props }) =>
    <Box as={component} {...props} />

export default Box
