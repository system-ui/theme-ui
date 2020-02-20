import {
  toCustomProperties,
  createColorStyles,
} from '../src/custom-properties'

describe('toCustomProperties', () => {
  test('converts theme object to custom properties', () => {
    const result = toCustomProperties({
      initialColorModeName: 'light',
      colors: {
        text: 'black',
      },
      space: [
        0, 4, 8, 16, 32,
      ],
      fonts: {
        body: 'system-ui, sans-serif',
      },
      fontWeights: {
        body: 400,
      },
    })
    expect(result).toEqual({
      initialColorModeName: 'light',
      colors: {
        text: 'var(--theme-ui-colors-text, black)',
      },
      space: [
        'var(--theme-ui-space-0, 0px)',
        'var(--theme-ui-space-1, 4px)',
        'var(--theme-ui-space-2, 8px)',
        'var(--theme-ui-space-3, 16px)',
        'var(--theme-ui-space-4, 32px)',
      ],
      fonts: {
        body: 'var(--theme-ui-fonts-body, system-ui, sans-serif)',
      },
      fontWeights: {
        body: 'var(--theme-ui-fontWeights-body, 400)',
      }
    })
  })
})

describe('createColorStyles', () => {
  test('creates styles from color palette', () => {
    const styles = createColorStyles({
      colors: {
        text: 'tomato',
        background: 'white',
        modes: {
          dark: {
            text: 'white',
            background: 'black',
          },
        },
      }
    })
    expect(styles).toEqual({
      body: {
        color: 'tomato',
        backgroundColor: 'white',
        '--theme-ui-colors-text': 'tomato',
        '--theme-ui-colors-background': 'white',
        '&.theme-ui-dark': {
          '--theme-ui-colors-text': 'white',
          '--theme-ui-colors-background': 'black',
        }
      }
    })
  })
})
