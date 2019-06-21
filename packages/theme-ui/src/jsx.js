import { jsx as emotion } from '@emotion/core'
import css from '@styled-system/css'

const getCSS = props => theme => {
  const styles = css(props.sx)(theme)
  const raw = typeof props.css === 'function' ? props.css(theme) : props.css
  return [styles, raw]
}

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [
    type,
    props
      ? {
          ...props,
          css: getCSS(props),
        }
      : null,
    ...children,
  ])

export default jsx
