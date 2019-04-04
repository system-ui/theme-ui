const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
}

export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    muted: '#f6f6f6',
    highlight: '#ffffcc',
    header: {
      text: 'inherit',
      background: 'inherit',
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: '400',
    heading: '700',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  styles: {
    wrapper: {
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'text',
      bg: 'background',
    },
    h1: {
      ...heading,
      fontSize: 6,
    },
    h2: {
      ...heading,
      fontSize: 5,
    },
    h3: {
      ...heading,
      fontSize: 4,
    },
    h4: {
      ...heading,
      fontSize: 3,
    },
    h5: {
      ...heading,
      fontSize: 2,
    },
    h6: {
      ...heading,
      fontSize: 1,
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary',
      }
    },
    pre: {
      fontFamily: 'monospace',
      p: 3,
      bg: 'muted',
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1,
    },
    inlineCode: {
      fontFamily: 'monospace',
      bg: 'muted',
    },
  },
}
