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
    gray: '#777',
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
    Header: {
      color: 'header.text',
      bg: 'header.background',
    },
    Footer: {
      color: 'header.text',
      bg: 'header.background',
    },
    Container: {
      p: 3,
      maxWidth: 1280,
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
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
      variant: 'prism',
      fontFamily: 'monospace',
      p: 3,
      bg: 'muted',
      overflow: 'auto',
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
  prism: {
    [[
      '.comment',
      '.prolog',
      '.doctype',
      '.cdata',
      '.punctuation',
    ]]: {
      color: 'gray',
    },
    '.comment': {
      fontStyle: 'italic',
    }
  },
}
