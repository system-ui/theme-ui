/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

export default forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    sx={{
      appearance: 'none',
      width: '100%',
      height: 32,
      fontFamily: 'inherit',
      fontSize: 16,
      p: 1,
      m: 0,
      border: '1px solid',
      borderColor: 'gray',
      ':focus': {
        borderColor: 'primary',
        outline: 'none',
      },
      ...props.sx,
    }}
  />
))
