// Based on https://github.com/jgthms/bulma/blob/master/sass/utilities/initial-variables.sass
// https://github.com/jgthms/bulma/blob/master/sass/base/minireset.sass
// https://github.com/jgthms/bulma/blob/master/sass/base/generic.sass

export const baseColors = {
  black: 'hsl(0, 0%, 4%)',
  blackBis: 'hsl(0, 0%, 7%)',
  blackTer: 'hsl(0, 0%, 14%)',
  // (sic)
  greyDarker: 'hsl(0, 0%, 21%)',
  greyDark: 'hsl(0, 0%, 29%)',
  grey: 'hsl(0, 0%, 48%)',
  greyLight: 'hsl(0, 0%, 71%)',
  greyLighter: 'hsl(0, 0%, 86%)',
  whiteTer: 'hsl(0, 0%, 96%)',
  whiteBis: 'hsl(0, 0%, 98%)',
  white: 'hsl(0, 0%, 100%)',
  orange: 'hsl(14,  100%, 53%)',
  yellow: 'hsl(48,  100%, 67%)',
  green: 'hsl(141, 71%,  48%)',
  turquoise: 'hsl(171, 100%, 41%)',
  cyan: 'hsl(204, 86%,  53%)',
  blue: 'hsl(217, 71%,  53%)',
  purple: 'hsl(271, 100%, 71%)',
  red: 'hsl(348, 100%, 61%)',
}

export const colors = {
  ...baseColors,
  text: baseColors.greyDark,
  background: baseColors.white,
  primary: baseColors.blue,
  muted: baseColors.whiteTer,
  // bulma-specific
  info: baseColors.cyan,
  success: baseColors.green,
  warning: baseColors.yellow,
  danger: baseColors.red,
  light: baseColors.whiteTer,
  dark: baseColors.greyDarker,
  modes: {
    invert: {},
  },
}

export const fonts = {
  body:
    'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  heading: 'inherit',
  monospace: 'monospace',
}

export const fontSizes = [
  '0.75rem',
  '0.875rem', // tweener
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
  '2.5rem',
  '3rem',
]

export const fontWeights = {
  body: 400,
  heading: 700,
  bold: 700,
  light: 300,
  medium: 500,
  semibold: 500,
}

export const lineHeights = {
  body: 1.5,
  heading: 1.125,
}

// guesstimate
export const space = [0, 0.5, 1, 1.5, 2, 2.5, 3].map(n => n + 'rem')

const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  m: 0,
  mb: 1,
}

// needs works
export const styles = {
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  h1: {
    ...heading,
    fontSize: 6,
    mt: 2,
  },
  h2: {
    ...heading,
    fontSize: 5,
    mt: 2,
  },
  h3: {
    ...heading,
    fontSize: 4,
    mt: 3,
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
    mb: 2,
  },
  code: {},
  pre: {},
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3,
  },
}

export const bulma = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  space,
  styles,
}

export default bulma
