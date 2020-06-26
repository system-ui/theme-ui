import React from 'react'
import { jsx } from '@theme-ui/core'

export const Box = React.forwardRef(
  (
    {
      as = 'div',
      sx,
      variant: _variant,
      config = {},
      // TODO: backwards compatibility
      color,
      bg,
      m,
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
      p,
      pt,
      pr,
      pb,
      pl,
      px,
      py,
      //
      ...props
    },
    ref
  ) => {
    const variant = config.group ? [config.group, _variant].join('.') : _variant

    const styles = {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
      // for backwards compatibility
      color,
      bg,
      m,
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
      p,
      pt,
      pr,
      pb,
      pl,
      px,
      py,
      //
      ...config.sx,
      variant,
      ...sx,
    }

    return jsx(as, {
      sx: styles,
      ...props,
    })
  }
)

Box.displayName = 'Box'

export default Box
