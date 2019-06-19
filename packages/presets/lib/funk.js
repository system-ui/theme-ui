import base from './base'

export const funk = {
  ...base,
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    ...base.colors,
    primary: '#609',
    secondary: '#306',
  },
  styles: {
    ...base.styles,
  },
}

export default funk
