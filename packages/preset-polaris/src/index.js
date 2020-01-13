import base from '@theme-ui/preset-base'

const text = '"San Francisco", Roboto, "Segoe UI", "Helvetica Neue", sans-serif'
export const polaris = {
  ...base,
  colors: {
    text: '#454f5b',
    background: '#fff',
    primary: '#5C6AC4',
    secondary: '#006FBB',
    highlight: '#47C1BF',
    muted: '#e6e6e6',
    gray: '#DFE3E8',
    accent: '#F49342',
    darken: '#00044C',
    modes: {
      dark: {
        text: '#3E4155',
        background: '#000639',
        primary: '#9C6ADE',
        secondary: '#B4E1FA',
        highlight: '#B7ECEC',
        muted: '#e6e6e6',
      },
    },
  },
  fonts: {
    body: text,
    heading: text,
    moonospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
}

export default polaris
