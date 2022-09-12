// @ts-ignore no types
import { toTheme } from 'theme-ui-typography'
import merge from 'lodash.merge'
// @ts-ignore no types
import fairyGates from 'typography-theme-fairy-gates'

const typography = toTheme(fairyGates)

const theme = merge(typography, {
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

export default theme
