import {
  toCustomProperties,
  __createColorStyles,
} from '../src/custom-properties'

describe('toCustomProperties', () => {
  test('converts theme object to custom properties', () => {
    const result = toCustomProperties({
      config: {
        initialColorModeName: 'light',
      },
      colors: {
        text: 'black',
      },
      space: [0, 4, 8, 16, 32],
      fonts: {
        body: 'system-ui, sans-serif',
      },
      fontWeights: {
        body: 400,
      },
    })
    expect(result).toEqual({
      config: {
        initialColorModeName: 'light',
      },
      colors: {
        text: 'var(--theme-ui-colors-text)',
      },
      space: [
        'var(--theme-ui-space-0)',
        'var(--theme-ui-space-1)',
        'var(--theme-ui-space-2)',
        'var(--theme-ui-space-3)',
        'var(--theme-ui-space-4)',
      ],
      fonts: {
        body: 'var(--theme-ui-fonts-body)',
      },
      fontWeights: {
        body: 'var(--theme-ui-fontWeights-body)',
      },
    })
  })

  test('handles undefined as first argument', () => {
    const result = toCustomProperties(undefined, 'colors')

    expect(result).toStrictEqual({})
  })
})

describe('__createColorStyles', () => {
  test('creates styles from color palette', () => {
    const styles = __createColorStyles({
      colors: {
        text: 'tomato',
        background: 'white',
        primary: {
          __default: '#3333ee',
          light: '#7373f7',
          dark: '#00008f',
        },
        modes: {
          dark: {
            text: 'white',
            background: 'black',
            primary: {
              __default: '#ee4933',
              light: '#fd6d5a',
              dark: '#962415',
            },
          },
        },
      },
    })
    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'tomato',
      '--theme-ui-colors-background': 'white',
      '--theme-ui-colors-primary': '#3333ee',
      '--theme-ui-colors-primary-light': '#7373f7',
      '--theme-ui-colors-primary-dark': '#00008f',
      '&.theme-ui-dark, .theme-ui-dark &': {
        '--theme-ui-colors-text': 'white',
        '--theme-ui-colors-background': 'black',
        '--theme-ui-colors-primary': '#ee4933',
        '--theme-ui-colors-primary-light': '#fd6d5a',
        '--theme-ui-colors-primary-dark': '#962415',
      },
    })
  })

  test('creates styles from simple theme', () => {
    const styles = __createColorStyles({
      colors: {
        text: 'tomato',
        background: 'white',
        modes: {
          dark: {
            text: 'white',
            background: 'black',
          },
        },
      },
    })
    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'tomato',
      '--theme-ui-colors-background': 'white',
      '&.theme-ui-dark, .theme-ui-dark &': {
        '--theme-ui-colors-text': 'white',
        '--theme-ui-colors-background': 'black',
      },
    })
  })

  test('creates styles at the HTML root', () => {
    const styles = __createColorStyles({
      useRootStyles: true,
      colors: {
        text: 'white',
        background: 'tomato',
        modes: {
          light: {
            text: 'tomato',
            background: 'white',
          },
        },
      },
    })
    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'white',
      '--theme-ui-colors-background': 'tomato',
      '&.theme-ui-light, .theme-ui-light &': {
        '--theme-ui-colors-text': 'tomato',
        '--theme-ui-colors-background': 'white',
      },
    })
  })

  test('creates styles at the HTML root and override the body styles prop', () => {
    const styles = __createColorStyles({
      useRootStyles: true,
      colors: {
        text: 'white',
        background: 'tomato',
        modes: {
          light: {
            text: 'tomato',
            background: 'white',
          },
        },
      },
    })
    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'white',
      '--theme-ui-colors-background': 'tomato',
      '&.theme-ui-light, .theme-ui-light &': {
        '--theme-ui-colors-text': 'tomato',
        '--theme-ui-colors-background': 'white',
      },
    })
  })

  test('creates styles for print color mode', () => {
    const styles = __createColorStyles({
      config: {
        printColorModeName: 'light',
      },
      colors: {
        text: 'white',
        background: 'tomato',
        modes: {
          light: {
            text: 'tomato',
            background: 'white',
          },
        },
      },
    })

    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'white',
      '--theme-ui-colors-background': 'tomato',
      '&.theme-ui-light, .theme-ui-light &': {
        '--theme-ui-colors-text': 'tomato',
        '--theme-ui-colors-background': 'white',
      },
      '@media print': {
        '--theme-ui-colors-text': 'tomato',
        '--theme-ui-colors-background': 'white',
      },
    })
  })

  test('creates styles for print color mode if its name is the same as initialColorModeName', () => {
    const styles = __createColorStyles({
      config: {
        initialColorModeName: 'light',
        useColorSchemeMediaQuery: true,
        printColorModeName: 'light',
      },
      colors: {
        text: '#fff',
        background: '#000',
        modes: {
          light: {
            text: '#000',
            background: '#fff',
          },
        },
      },
    })

    expect(styles['@media print']).toEqual({
      '--theme-ui-colors-text': '#000',
      '--theme-ui-colors-background': '#fff',
    })
  })

  test('creates styles for initial print color mode', () => {
    const styles = __createColorStyles({
      config: {
        initialColorModeName: 'tomato',
        printColorModeName: 'tomato',
      },
      colors: {
        text: 'tomato',
        background: 'white',
        modes: {
          dark: {
            text: 'white',
            background: 'black',
          },
        },
      },
    })
    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'tomato',
      '--theme-ui-colors-background': 'white',
      '&.theme-ui-dark, .theme-ui-dark &': {
        '--theme-ui-colors-text': 'white',
        '--theme-ui-colors-background': 'black',
      },
      '@media print': {
        '--theme-ui-colors-text': 'tomato',
        '--theme-ui-colors-background': 'white',
      },
    })
  })

  test('creates styles from color palette', () => {
    const styles = __createColorStyles({
      colors: {
        text: 'tomato',
        background: 'white',
      },
    })
    expect(styles).toEqual({
      color: 'var(--theme-ui-colors-text)',
      backgroundColor: 'var(--theme-ui-colors-background)',
      '--theme-ui-colors-text': 'tomato',
      '--theme-ui-colors-background': 'white',
    })
  })
})
