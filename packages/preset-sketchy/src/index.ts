import { makeTheme } from '@theme-ui/css/utils'

import { ThemeUIPresetSketchyVariants, variants } from './variants'

const scalesAndStyles = makeTheme({
  colors: {
    text: '#000200',
    background: '#FAFAF9',
    muted: 'rgba(0,0,0,.1)',
    primary: '#F25F5C',
    primaryDark: '#B51916',
    primaryLight: '#FCBAB1',
    blue: '#B6DEE2',
    blueDark: '#247BA0',
    greenDark: '#2D5948',
    green: '#B2E4DC',
    yellowDark: '#FFDA3A',
    yellow: '#FCF5C7',
  },
  fonts: {
    body: '"Architects Daughter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  sizes: {
    container: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  radii: {
    sketchy0: '225px 25px 225px / 25px 225px',
    sketchy1: '15px 255px 15px / 225px 15px',
    sketchy2: '10px 125px 20px / 205px 25px',
    sketchy3: '225px 15px 15px / 15px 225px',
    sketchy4: '80px 15px 105px / 25px 250px',
    circle: '200px 185px 160px / 195px 160px',
  },
  borders: {
    thick: '2px solid var(--theme-ui-colors-text, black)',
    thin: '1px solid var(--theme-ui-colors-text, black)',
  },
  shadows: {
    outline: '0 0 0px 1px black rgba(0,0,0,.4)',
    default: '15px 24px 25px -18px rgba(0,0,0,.4)',
    hover: '2px 8px 10px -6px rgba(0,0,0,.4)',
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'primaryDark',
      },
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1,
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'blueDark',
    },
    table: {
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      border: 'thick',
      borderRadius: 'sketchy3',
      borderBottomWidth: '1px',
      p: 2,
    },
    td: {
      border: 'thick',
      borderRadius: 'sketchy1',
      p: 2,
    },
    hr: {
      border: 0,
      borderBottom: 'thin',
    },
    img: {
      maxWidth: '100%',
    },
  },
})

type ThemeUIPresetSketchyScalesAndStyles = typeof scalesAndStyles
interface ThemeUIPresetSketchy
  extends ThemeUIPresetSketchyScalesAndStyles,
    ThemeUIPresetSketchyVariants {}

const presetSketchy: ThemeUIPresetSketchy = {
  ...scalesAndStyles,
  ...variants,
}

export default presetSketchy
