/** @jsx jsx */
import { jsx } from 'theme-ui'
import Chevron from './Chevron'

export default props =>
  <div
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}>
    <select
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
        variant: '@theme-ui/editor.select',
        ...props.sx,
      }}
    />
    <Chevron
      sx={{
        ml: '-24px',
      }}
    />
  </div>
