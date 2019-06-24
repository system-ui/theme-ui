// Based on https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js

export const breakpoints = ["40rem", "48rem", "64rem", "80rem"];

export const baseColors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  gray: {
    100: "#f7fafc",
    200: "#edf2f7",
    300: "#e2e8f0",
    400: "#cbd5e0",
    500: "#a0aec0",
    600: "#718096",
    700: "#4a5568",
    800: "#2d3748",
    900: "#1a202c"
  },
  red: {
    100: "#fff5f5",
    200: "#fed7d7",
    300: "#feb2b2",
    400: "#fc8181",
    500: "#f56565",
    600: "#e53e3e",
    700: "#c53030",
    800: "#9b2c2c",
    900: "#742a2a"
  },
  orange: {
    100: "#fffaf0",
    200: "#feebc8",
    300: "#fbd38d",
    400: "#f6ad55",
    500: "#ed8936",
    600: "#dd6b20",
    700: "#c05621",
    800: "#9c4221",
    900: "#7b341e"
  },
  yellow: {
    100: "#fffff0",
    200: "#fefcbf",
    300: "#faf089",
    400: "#f6e05e",
    500: "#ecc94b",
    600: "#d69e2e",
    700: "#b7791f",
    800: "#975a16",
    900: "#744210"
  },
  green: {
    100: "#f0fff4",
    200: "#c6f6d5",
    300: "#9ae6b4",
    400: "#68d391",
    500: "#48bb78",
    600: "#38a169",
    700: "#2f855a",
    800: "#276749",
    900: "#22543d"
  },
  teal: {
    100: "#e6fffa",
    200: "#b2f5ea",
    300: "#81e6d9",
    400: "#4fd1c5",
    500: "#38b2ac",
    600: "#319795",
    700: "#2c7a7b",
    800: "#285e61",
    900: "#234e52"
  },
  blue: {
    100: "#ebf8ff",
    200: "#bee3f8",
    300: "#90cdf4",
    400: "#63b3ed",
    500: "#4299e1",
    600: "#3182ce",
    700: "#2b6cb0",
    800: "#2c5282",
    900: "#2a4365"
  },
  indigo: {
    100: "#ebf4ff",
    200: "#c3dafe",
    300: "#a3bffa",
    400: "#7f9cf5",
    500: "#667eea",
    600: "#5a67d8",
    700: "#4c51bf",
    800: "#434190",
    900: "#3c366b"
  },
  purple: {
    100: "#faf5ff",
    200: "#e9d8fd",
    300: "#d6bcfa",
    400: "#b794f4",
    500: "#9f7aea",
    600: "#805ad5",
    700: "#6b46c1",
    800: "#553c9a",
    900: "#44337a"
  },
  pink: {
    100: "#fff5f7",
    200: "#fed7e2",
    300: "#fbb6ce",
    400: "#f687b3",
    500: "#ed64a6",
    600: "#d53f8c",
    700: "#b83280",
    800: "#97266d",
    900: "#702459"
  }
};

export const colors = {
  ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[9],
  background: baseColors.white,
  primary: baseColors.cyan[3],
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green[3],
  info: baseColors.cyan[4],
  warning: baseColors.yellow[3],
  danger: baseColors.red[3],
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6]
};

export const baseFonts = {
  sans:
    '-apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
};

export const fonts = {
  ...baseFonts,
  body: baseFonts.sans,
  heading: "inherit",
  monospace: baseFonts.mono
};

export const fontSizes = [
  "0.875rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "1.875rem",
  "2.25rem",
  "3rem",
  "4rem",
  "4.5rem"
];

export const baseFontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
};

export const fontWeights = {
  ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold
};

export const baseLineHeights = {
  none: "1",
  tight: "1.25",
  relaxed: "1.625",
  loose: "2"
};

export const lineHeights = {
  ...baseLineHeights,
  body: baseLineHeights.relaxed,
  heading: baseLineHeights.tight
};

export const space = [
  0,
  "0.25rem",
  "0.5rem",
  "1rem",
  "2rem",
  "4rem",
  "8rem",
  "16rem",
  "32rem"
];

export const letterSpacings = {
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};

export const sizes = {
  px: "1px",
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem"
};

export const borderWidths = {
  px: "1px",
  "0": "0",
  "2": "2px",
  "4": "4px",
  "8": "8px"
};

export const radii = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  lg: "0.5rem",
  full: "9999px"
};

export const shadows = {
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  none: "none"
};

export const zIndices = {
  auto: "auto",
  "0": "0",
  "10": "10",
  "20": "20",
  "30": "30",
  "40": "40",
  "50": "50"
};

const heading = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
  m: 0,
  mb: 1
};

// needs works
export const styles = {
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body"
  },
  a: {
    color: "primary",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline"
    }
  },
  h1: {
    ...heading,
    fontSize: 6,
    mt: 2
  },
  h2: {
    ...heading,
    fontSize: 5,
    mt: 2
  },
  h3: {
    ...heading,
    fontSize: 4,
    mt: 3
  },
  h4: {
    ...heading,
    fontSize: 3
  },
  h5: {
    ...heading,
    fontSize: 2
  },
  h6: {
    ...heading,
    fontSize: 1,
    mb: 2
  },
  code: {},
  pre: {},
  hr: {
    bg: "muted",
    border: 0,
    height: "1px",
    m: 3
  }
};

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
  styles
};

export default tailwind;
