import { Theme } from '@theme-ui/css'

const theme: Theme = {
  initialColorModeName: 'light',
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    muted: '#e6e6e6',
    highlight: '#ffffcc',
    gray: '#777',
    purple: '#609',
    modes: {
      dark: {
        text: '#fff',
        background: '#060606',
        primary: '#e0f ',
        secondary: '#3cf',
        muted: '#252525',
        highlight: '#ffffcc',
        gray: '#999',
        purple: '#c0f',
      },
    },
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
}

export default theme
