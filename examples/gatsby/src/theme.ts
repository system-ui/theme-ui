import type { Theme } from 'theme-ui'

const theme: Theme = {
  config: {
    initialColorModeName: 'light',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'rgb(0 0 255)',
    primary05: 'rgb(0 0 255 / 0.05)',
    secondary: '#609',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
  },
  styles: {
    root: {
      fontFamily: 'body',
      color: 'text',
      bg: 'background',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      bg: 'primary05',
      p: 1,
      borderRadius: '2px',
      ':hover': {
        p: 2,
        m: -1,
        borderRadius: '4px',
      },
    },
  },
}

export default theme
