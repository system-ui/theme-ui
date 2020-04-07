/** @jsx jsx */
import { jsx } from '@theme-ui/core'

export const Box = ({ as = 'div', __css, ...props }) => {
  return jsx(as, {
    sx: {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
      ...__css,
    },
    ...props,
  })
}

export default Box
