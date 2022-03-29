const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#609',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
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
      ':hover': {
        color: 'secondary',
        textDecoration: 'underline',
      },
    },
    code: {
      borderRadius: 2,
      bg: '#eee',
      px: 1,
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
  },
}

export default theme
