import styled from '@emotion/styled'
import { css, get } from '@theme-ui/css'
import { merge } from '@theme-ui/core'
import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import space from '@styled-system/space'
import color from '@styled-system/color'

const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
])

const sx = props => css(props.sx)(props.theme)
const base = props => css(props.__css)(props.theme)
const variant = ({ theme, variant, __themeKey = 'variants' }) =>
  css(get(theme, __themeKey + '.' + variant, get(theme, variant)))
const variants = ({ theme, variants = [], __themeKey = 'variants' }) =>
  css(merge(variants.map(v => get(theme, __themeKey + '.' + v, get(theme, v)))))

export const Box = styled('div', {
  shouldForwardProp,
})(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  base,
  variants,
  variant,
  space,
  color,
  sx,
  props => props.css
)

export default Box
