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
      fontSize: 'inherit',
      p: 1,
      m: 0,
      color: 'black',
      bg: 'white',
      border: '1px solid',
      borderColor: 'lightgray',
      ':focus': {
        borderColor: 'primary',
        outline: 'none',
      },
      variant: '@theme-ui/editor.input',
      ...props.sx,
    }}
  />
))
