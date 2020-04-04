/** @jsx jsx */
import { jsx } from '@theme-ui/core'

export const Box = ({ as = 'div', ...props }) => {
  return jsx(as, {
    sx: {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
    },
    ...props,
  })
}

export default Box
