import { jsx as emotion } from '@emotion/core'
import css from '@styled-system/css'

// todo:
// - handle functions or objects
// - handle multiple arguments (arrays)
const handleFunction = css => theme => typeof css === 'function'
  ? css(theme)
  : css

const getCSS = props => theme => props.scss ? [
  css(props.scss)(theme),
  handleFunction(props.css)(theme),
] : props.css

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [
    type,
    props ? ({
      ...props,
      css: getCSS(props),
    }) : null,
    ...children
  ])

export default jsx
