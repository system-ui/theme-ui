import styled from '@emotion/styled'
import deepmerge from 'deepmerge'
import { css, get } from '@theme-ui/css'
import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import space from '@styled-system/space'
import color from '@styled-system/color'

const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
])

const sx = (props) => css(props.sx)(props.theme)
const base = (props) => css(props.__css)(props.theme)
const variant = ({ theme, variant, __themeKey = 'variants' }) => {
  if (Array.isArray(variant)) {
    return css(
      deepmerge.all(
        variant.map(
          (v) => get(theme, __themeKey + '.' + v, get(theme, v)) || {}
        )
      )
    )
  }
  return css(get(theme, __themeKey + '.' + variant, get(theme, variant)))
}

export const Box = styled('div', {
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
  (props) => props.css
)

export default Box
