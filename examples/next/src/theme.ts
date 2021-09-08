import { makeTheme } from '@theme-ui/css/utils'

export const theme = makeTheme({
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,

  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#b0b',
    modes: {
      dark: {
        text: '#fff',
        background: '#222',
        primary: '#0cf',
        secondary: '#faf',
      },
    },
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'sans-serif',
  },

  styles: {
    root: {
      fontFamily: 'body',
      color: 'text',
      bg: 'background',
      p: 4,
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

  buttons: {
    primary: {
      cursor: 'pointer',
    },
  },
})
