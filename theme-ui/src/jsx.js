import { jsx as emotion } from '@emotion/core'
import css from '@styled-system/css'

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [
    type,
    props ? ({
      ...props,
      css: props.css ? css(props.css) : undefined
    }) : null,
    ...children
  ])

export default jsx
