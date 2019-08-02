// Based on https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js

export const breakpoints = ['40rem', '48rem', '64rem', '80rem']

export const baseColors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: [
    null,
    '#f7fafc',
    '#edf2f7',
    '#e2e8f0',
    '#cbd5e0',
    '#a0aec0',
    '#718096',
    '#4a5568',
    '#2d3748',
    '#1a202c',
  ],
  red: [
    null,
    '#fff5f5',
    '#fed7d7',
    '#feb2b2',
    '#fc8181',
    '#f56565',
    '#e53e3e',
    '#c53030',
    '#9b2c2c',
    '#742a2a',
  ],
  orange: [
    null,
    '#fffaf0',
    '#feebc8',
    '#fbd38d',
    '#f6ad55',
    '#ed8936',
    '#dd6b20',
    '#c05621',
    '#9c4221',
    '#7b341e',
  ],
  yellow: [
    null,
    '#fffff0',
    '#fefcbf',
    '#faf089',
    '#f6e05e',
    '#ecc94b',
    '#d69e2e',
    '#b7791f',
    '#975a16',
    '#744210',
  ],
  green: [
    null,
    '#f0fff4',
    '#c6f6d5',
    '#9ae6b4',
    '#68d391',
    '#48bb78',
    '#38a169',
    '#2f855a',
    '#276749',
    '#22543d',
  ],
  teal: [
    null,
    '#e6fffa',
    '#b2f5ea',
    '#81e6d9',
    '#4fd1c5',
    '#38b2ac',
    '#319795',
    '#2c7a7b',
    '#285e61',
    '#234e52',
  ],
  blue: [
    null,
    '#ebf8ff',
    '#bee3f8',
    '#90cdf4',
    '#63b3ed',
    '#4299e1',
    '#3182ce',
    '#2b6cb0',
    '#2c5282',
    '#2a4365',
  ],
  indigo: [
    null,
    '#ebf4ff',
    '#c3dafe',
    '#a3bffa',
    '#7f9cf5',
    '#667eea',
    '#5a67d8',
    '#4c51bf',
    '#434190',
    '#3c366b',
  ],
  purple: [
    null,
    '#faf5ff',
    '#e9d8fd',
    '#d6bcfa',
    '#b794f4',
    '#9f7aea',
    '#805ad5',
    '#6b46c1',
    '#553c9a',
    '#44337a',
  ],
  pink: [
    null,
    '#fff5f7',
    '#fed7e2',
    '#fbb6ce',
    '#f687b3',
    '#ed64a6',
    '#d53f8c',
    '#b83280',
    '#97266d',
    '#702459',
  ],
}

export const colors = {
  ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[8],
  background: baseColors.white,
  primary: baseColors.blue[3],
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green[3],
  info: baseColors.blue[4],
  warning: baseColors.yellow[3],
  danger: baseColors.red[3],
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6],
}

export const baseFonts = {
  sans:
    '-apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
}

export const fonts = {
  ...baseFonts,
  body: baseFonts.sans,
  heading: 'inherit',
  monospace: baseFonts.mono,
}

export const fontSizes = [
  '0.875rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.875rem',
  '2.25rem',
  '3rem',
  '4rem',
  '4.5rem',
]

export const baseFontWeights = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}

export const fontWeights = {
  ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold,
}

export const baseLineHeights = {
  none: '1',
  tight: '1.25',
  relaxed: '1.625',
  loose: '2',
}

export const lineHeights = {
  ...baseLineHeights,
  body: baseLineHeights.relaxed,
  heading: baseLineHeights.tight,
}

export const space = [
  0,
  '0.25rem',
  '0.5rem',
  '1rem',
  '2rem',
  '4rem',
  '8rem',
  '16rem',
  '32rem',
]

export const letterSpacings = {
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

export const sizes = {
  px: '1px',
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
}

export const borderWidths = {
  px: '1px',
  '0': '0',
  '2': '2px',
  '4': '4px',
  '8': '8px',
}

export const radii = {
  none: '0',
  sm: '0.125rem',
  default: '0.25rem',
  lg: '0.5rem',
  full: '9999px',
}

export const shadows = {
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  none: 'none',
}

export const zIndices = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
}

const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  m: 0,
  mb: 1,
}

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

export const tailwind = {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
  letterSpacings,
  sizes,
  borderWidths,
  radii,
  shadows,
  zIndices,
  styles,
}

export default tailwind
