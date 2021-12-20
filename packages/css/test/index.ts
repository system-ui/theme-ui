import { css, NestedScaleDict, Theme } from '../src'

const theme: Theme = {
  colors: {
    primary: 'tomato',
    secondary: 'cyan',
    background: 'white',
    text: 'black',
    purple: {
      __default: 'darkviolet',
      100: 'rebeccapurple',
      500: 'darkviolet',
      900: 'violet',
    },
    pink: {
      100: 'mediumvioletred',
      500: 'hotpink',
      900: 'pink',
    },
  },
  fontSizes: [12, 14, 16, 24, 36],
  fonts: {
    monospace: 'Menlo, monospace',
  },
  lineHeights: {
    body: 1.5,
  },
  fontWeights: {
    bold: 600,
  },
  sizes: {
    small: 4,
    medium: 8,
    large: 16,
    sidebar: 320,
  },
  buttons: {
    __default: {
      px: 4,
      py: 2,
      fontWeight: 'bold',
      color: 'secondary',
      bg: 'background',
    },
    primary: {
      p: 3,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      borderRadius: 2,
    },
    size: {
      size: '100%',
      bg: 'primary',
    },
    round: {
      variant: 'buttons.size',
      overflow: 'hidden',
      borderRadius: '50%',
    },
  },
  text: {
    caps: {
      fontSize: [1, 2],
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: [3, 4],
      letterSpacing: ['-0.01em', '-0.02em'],
    },
  },
  borders: {
    body: '3px solid #000000',
  },
  borderWidths: {
    thin: 1,
  },
  borderStyles: {
    thick: 'solid',
  },
  radii: {
    small: 5,
  },
  opacities: [0, '50%'],
  transitions: {
    standard: '0.3s ease-in-out',
  },
  shadows: {
    card: '5px 5px 15px 5px #000000',
  },
  zIndices: {
    below: -1,
    body: 1,
    nav: 2,
  },
}

test('returns a function', () => {
  const result = css()
  expect(typeof result).toBe('function')
})

test('returns an object', () => {
  const result = css()()
  expect(typeof result).toBe('object')
})

test('returns styles', () => {
  const result = css({
    fontSize: 32,
    color: 'blue',
    borderRadius: 4,
  })()
  expect(result).toEqual({
    fontSize: 32,
    color: 'blue',
    borderRadius: 4,
  })
})

test('returns system props styles', () => {
  const result = css({
    color: 'primary',
    fontSize: [2, 3, 4],
  })({ theme })
  expect(result).toEqual({
    fontSize: 16,
    '@media screen and (min-width: 40em)': {
      fontSize: 24,
    },
    '@media screen and (min-width: 52em)': {
      fontSize: 36,
    },
    color: 'tomato',
  })
})

test('returns nested system props styles', () => {
  const result = css({
    color: 'primary',
    '&:hover': {
      color: 'secondary',
    },
  })({ theme })
  expect(result).toEqual({
    color: 'tomato',
    '&:hover': {
      color: 'cyan',
    },
  })
})

test('returns nested responsive styles', () => {
  const result = css({
    color: 'primary',
    h1: {
      py: [3, 4],
      scrollPaddingY: [2, 4],
    },
  })({ theme })
  expect(result).toEqual({
    color: 'tomato',
    h1: {
      paddingTop: 16,
      paddingBottom: 16,
      scrollPaddingBottom: 8,
      scrollPaddingTop: 8,
      '@media screen and (min-width: 40em)': {
        paddingTop: 32,
        paddingBottom: 32,
        scrollPaddingBottom: 32,
        scrollPaddingTop: 32,
      },
    },
  })
})

test('handles all core styled system props', () => {
  const result = css({
    m: 0,
    mb: 2,
    mx: 'auto',
    p: 3,
    py: 4,
    scrollMargin: 5,
    scrollMarginY: 6,
    scrollPadding: 1,
    scrollPaddingY: 2,
    textDecorationColor: 'secondary',
    fontSize: 3,
    fontWeight: 'bold',
    color: 'primary',
    bg: 'secondary',
    opacity: 1,
    transition: 'standard',
    fontFamily: 'monospace',
    lineHeight: 'body',
    border: 'body',
    boxShadow: 'card',
    zIndex: 'nav',
  })({ theme })
  expect(result).toEqual({
    margin: 0,
    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
    scrollMargin: 64,
    scrollMarginTop: 128,
    scrollMarginBottom: 128,
    scrollPadding: 4,
    scrollPaddingTop: 8,
    scrollPaddingBottom: 8,
    textDecorationColor: 'cyan',
    color: 'tomato',
    backgroundColor: 'cyan',
    opacity: '50%',
    transition: '0.3s ease-in-out',
    fontFamily: 'Menlo, monospace',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.5,
    border: '3px solid #000000',
    boxShadow: '5px 5px 15px 5px #000000',
    zIndex: 2,
  })
})

test('handles css logical properties', () => {
  const result = css({
    borderInlineStartWidth: 'thin',
    borderStartEndRadius: 'small',
    marginInlineStart: 'auto',
    maxBlockSize: 'large',
    paddingInline: 0,
    marginBlockEnd: 2,
  })({ theme })
  expect(result).toEqual({
    borderInlineStartWidth: 1,
    borderStartEndRadius: 5,
    maxBlockSize: 16,
    paddingInline: 0,
    marginBlockEnd: 8,
    marginInlineStart: 'auto',
  })
})

test('works with the css prop', () => {
  const result = css({
    color: 'primary',
    m: 0,
    fontSize: 2,
  })(theme)
  expect(result).toEqual({
    color: 'tomato',
    margin: 0,
    fontSize: 16,
  })
})

test('works with functional arguments', () => {
  const result = css((t) => ({
    color: t.colors?.primary,
  }))(theme)
  expect(result).toEqual({
    color: 'tomato',
  })
})

test('supports functional values', () => {
  const result = css({
    color: (t) => t.colors?.primary,
  })(theme)
  expect(result).toEqual({
    color: 'tomato',
  })
})

test('returns `__default` key when accessing object value with default', () => {
  const result = css({
    color: 'purple',
  })(theme)
  expect(result).toEqual({
    color: 'darkviolet',
  })
})

test('returns nested key when accessing key from object value with __default', () => {
  const result = css({
    color: 'purple.100',
  })(theme)
  expect(result).toEqual({
    color: 'rebeccapurple',
  })
})

test('variant prop returns `__default` key when accessing variant object with default', () => {
  const result = css({
    variant: 'buttons',
  })(theme)

  expect(result).toEqual({
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 600,
    color: 'cyan',
    backgroundColor: 'white',
  })
})

test('returns object when accessing object value with no default key', () => {
  const result = css({
    color: 'pink',
  })(theme)
  // Note: Returning this object is the expected behavior; however, an object
  // value like this isn't able to become valid CSS. Ensure the theme path
  // points to a primitive value (such as 'pink.100') when intending to make
  // CSS out of these values.
  // Ref: https://github.com/system-ui/theme-ui/pull/951#discussion_r430697168
  expect(result).toEqual({
    color: {
      100: 'mediumvioletred',
      500: 'hotpink',
      900: 'pink',
    },
  })
})

test('returns variants from theme', () => {
  const result = css({
    variant: 'buttons.primary',
  })(theme)
  expect(result).toEqual({
    padding: 16,
    fontWeight: 600,
    color: 'white',
    backgroundColor: 'tomato',
    borderRadius: 2,
  })
})

test('returns nested variants from theme', () => {
  const result = css({
    variant: 'buttons.round',
  })(theme)
  expect(result).toEqual({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '50%',
    backgroundColor: 'tomato',
  })
})

test('handles variants with responsive values', () => {
  const result = css({
    variant: 'text.caps',
  })(theme)
  expect(result).toEqual({
    fontSize: 14,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    '@media screen and (min-width: 40em)': {
      fontSize: 16,
    },
  })
})

test('handles responsive variants', () => {
  const result = css({
    variant: 'text.title',
  })(theme)
  expect(result).toEqual({
    fontSize: 24,
    letterSpacing: '-0.01em',
    '@media screen and (min-width: 40em)': {
      fontSize: 36,
      letterSpacing: '-0.02em',
    },
  })
})

test('handles negative margins from scale', () => {
  const result = css({
    mt: -3,
    mx: -4,
  })(theme)
  expect(result).toEqual({
    marginTop: -16,
    marginLeft: -32,
    marginRight: -32,
  })
})

test('handles negative top, left, bottom, and right from scale', () => {
  const result = css({
    top: -1,
    right: -4,
    bottom: -3,
    left: -2,
  })(theme)
  expect(result).toEqual({
    top: -4,
    right: -32,
    bottom: -16,
    left: -8,
  })
})

test('handles negative margins from scale that is an object and value is string', () => {
  const result = css({
    mt: '-s',
    mx: '-m',
  })({ ...theme, space: { s: '16px', m: '32px' } })
  expect(result).toEqual({
    marginTop: '-16px',
    marginLeft: '-32px',
    marginRight: '-32px',
  })
})

test('handles negative margins from scale that is an object and value is number', () => {
  const result = css({
    mt: '-s',
    mx: '-m',
  })({ ...theme, space: { s: 16, m: 32 } })
  expect(result).toEqual({
    marginTop: -16,
    marginLeft: -32,
    marginRight: -32,
  })
})

test('skip breakpoints', () => {
  const result = css({
    width: ['100%', , '50%'],
  })(theme)
  expect(result).toEqual({
    width: '100%',
    '@media screen and (min-width: 40em)': {},
    '@media screen and (min-width: 52em)': {
      width: '50%',
    },
  })
})

test('padding shorthand does not collide with nested p selector', () => {
  const result = css({
    p: {
      fontSize: 32,
      color: 'tomato',
      p: 2,
    },
    padding: 32,
  })(theme)
  expect(result).toEqual({
    p: {
      fontSize: 32,
      color: 'tomato',
      padding: 8,
    },
    padding: 32,
  })
})

test('ignores array values longer than breakpoints', () => {
  const result = css({
    width: [32, 64, 128, 256, 512],
  })({
    breakpoints: ['32em', '40em'],
  })
  expect(result).toEqual({
    width: 32,
    '@media screen and (min-width: 32em)': {
      width: 64,
    },
    '@media screen and (min-width: 40em)': {
      width: 128,
    },
  })
})

test('functional values can return responsive arrays', () => {
  const result = css({
    color: (t) => [t.colors?.primary, t.colors?.secondary],
  })(theme)
  expect(result).toEqual({
    '@media screen and (min-width: 40em)': {
      color: 'cyan',
    },
    color: 'tomato',
  })
})

test('object with __default key is accepted as style value', () => {
  const actual = css({
    width: { __default: 2 },
    color: (t) => t.colors?.primary,
    backgroundColor: (t) => [
      t.colors?.background,
      (t.colors?.background as NestedScaleDict<string>).inverted,
    ],
  })({
    sizes: ['10px', '20px', '40px'],
    colors: {
      primary: {
        __default: 'blue',
        light: 'lightblue',
      },
      background: {
        __default: 'whitesmoke',
        inverted: 'black',
      },
    },
  })

  expect(actual).toEqual({
    '@media screen and (min-width: 40em)': {
      backgroundColor: 'black',
    },
    backgroundColor: 'whitesmoke',
    color: 'blue',
    width: 2, // yes, 2 not 40px
  })
})

test('returns individual border styles', () => {
  const result = css({
    borderTopWidth: 'thin',
    borderTopColor: 'primary',
    borderTopStyle: 'thick',
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    borderBottomWidth: 'thin',
    borderBottomColor: 'primary',
    borderBottomStyle: 'thick',
    borderBottomLeftRadius: 'small',
    borderBottomRightRadius: 'small',
    borderRightWidth: 'thin',
    borderRightColor: 'primary',
    borderRightStyle: 'thick',
    borderLeftWidth: 'thin',
    borderLeftColor: 'primary',
    borderLeftStyle: 'thick',
  })(theme)
  expect(result).toEqual({
    borderTopColor: 'tomato',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: 'tomato',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRightColor: 'tomato',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderLeftColor: 'tomato',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
  })
})

test('flexBasis uses theme.sizes', () => {
  const style = css({
    flexBasis: 'sidebar',
  })(theme)
  expect(style).toEqual({
    flexBasis: 320,
  })
})

test('fill and stroke and caretColor use theme.colors', () => {
  const style = css({
    fill: 'primary',
    stroke: 'secondary',
    caretColor: 'primary',
  })(theme)
  expect(style).toEqual({
    fill: 'tomato',
    stroke: 'cyan',
    caretColor: 'tomato',
  })
})

test('multiples are transformed', () => {
  const style = css({
    marginX: 2,
    marginY: 2,
    paddingX: 2,
    paddingY: 2,
    scrollMarginX: 2,
    scrollMarginY: 2,
    scrollPaddingX: 2,
    scrollPaddingY: 2,

    size: 'large',
  })(theme)
  expect(style).toEqual({
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    scrollMarginLeft: 8,
    scrollMarginRight: 8,
    scrollMarginTop: 8,
    scrollMarginBottom: 8,
    scrollPaddingLeft: 8,
    scrollPaddingRight: 8,
    scrollPaddingTop: 8,
    scrollPaddingBottom: 8,
    width: 16,
    height: 16,
  })
})

test('returns outline color from theme', () => {
  const result = css({
    outlineColor: 'primary',
  })(theme)
  expect(result).toEqual({
    outlineColor: 'tomato',
  })
})

test('returns correct media query order', () => {
  const result = css({
    width: ['100%', , '50%'],
    color: ['red', 'green', 'blue'],
  })(theme)
  const keys = Object.keys(result)
  expect(keys).toEqual([
    'width',
    '@media screen and (min-width: 40em)',
    '@media screen and (min-width: 52em)',
    'color',
  ])
  expect(result).toEqual({
    width: '100%',
    '@media screen and (min-width: 40em)': {
      color: 'green',
    },
    '@media screen and (min-width: 52em)': {
      width: '50%',
      color: 'blue',
    },
    color: 'red',
  })
})

test('returns correct media query order 2', () => {
  const result = css({
    flexDirection: 'column',
    justifyContent: [null, 'flex-start', 'flex-end'],
    color: 'background',
    height: '100%',
    px: [2, 3, 4],
    py: 4,
    scrollPadding: 4,
  })(theme)
  const keys = Object.keys(result)
  expect(keys).toEqual([
    'flexDirection',
    'justifyContent',
    '@media screen and (min-width: 40em)',
    '@media screen and (min-width: 52em)',
    'color',
    'height',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'scrollPadding',
  ])
})

test('returns custom media queries', () => {
  const result = css({
    fontSize: [2, 3, 4],
    color: 'primary',
  })({
    theme: {
      ...theme,
      breakpoints: [
        '32em',
        '@media screen and (orientation: landscape) and (min-width: 40rem)',
      ],
    },
  })
  const keys = Object.keys(result)
  expect(keys).toEqual([
    'fontSize',
    '@media screen and (min-width: 32em)',
    '@media screen and (orientation: landscape) and (min-width: 40rem)',
    'color',
  ])
  expect(result).toEqual({
    fontSize: 16,
    '@media screen and (min-width: 32em)': {
      fontSize: 24,
    },
    '@media screen and (orientation: landscape) and (min-width: 40rem)': {
      fontSize: 36,
    },
    color: 'tomato',
  })
})

test('supports vendor properties', () => {
  expect(css({ WebkitOverflowScrolling: 'touch' })(theme)).toStrictEqual({
    WebkitOverflowScrolling: 'touch',
  })
})

test('omits empty values', () => {
  expect(
    css({
      color: false && 'blue',
      backgroundColor: undefined && 'whitesmoke',
      textDecoration: null && 'underline',
      border: '1px solid black',
    })(theme)
  ).toStrictEqual({ border: '1px solid black' })
})

test('borderTopWidth accepts number', () => {
  expect(
    css({
      borderTopWidth: 7,
    })(theme)
  ).toEqual({
    borderTopWidth: 7,
  })

  expect(
    css({
      borderTopWidth: 1,
    })({
      borderWidths: ['10px', '20px'],
    })
  ).toEqual({
    borderTopWidth: '20px',
  })
})
