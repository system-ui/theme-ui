import { toTheme } from 'theme-ui-typography'
import merge from 'lodash.merge'
import fairyGates from 'typography-theme-fairy-gates'

const typography = toTheme(fairyGates)

export default merge(typography, {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#609',
  },
  styles: {
    root: {
      color: 'text',
      bg: 'background',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      ':hover': {
        color: 'secondary',
        textDecoration: 'underline',
      },
    },
  },
})
