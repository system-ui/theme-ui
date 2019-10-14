import styled from '@emotion/styled'
import css, { get } from '@styled-system/css'
import shouldForwardProp from '@styled-system/should-forward-prop'
import space from '@styled-system/space'
import color from '@styled-system/color'

// API
// - as
// - variant
// - sx
// - __base.key
// - system props??
// - margin/padding
// - color props
// - use emotion/styled?
//
// theme variants
// - text
// - text.heading
// - buttons
// - buttons.primary
// - buttons.secondary
// - cards
// - cards.primary
// - links
// - links.nav
// - forms
// - forms.label
// - forms.field
// - forms.input
// - forms.select
// - forms.textarea
// - forms.radio
// - forms.checkbox
// - forms.slider

// const styleProps = ({ }) =>

const sx = props => css(props.sx)(props.theme)
const base = props => css(props.__css)(props.theme)
const variant = ({ theme, variant, __themeKey = 'variants' }) =>
  css(get(theme, __themeKey + '.' + variant, get(theme, variant)))

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
  props => props.css
)
