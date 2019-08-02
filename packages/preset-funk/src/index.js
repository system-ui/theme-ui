import base from '@theme-ui/preset-base'

export const funk = {
  ...base,
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    monospace: 'Menlo, monospace',
  },
  lineHeights: {
    body: 1.625,
    heading: 1.25,
  },
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
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
