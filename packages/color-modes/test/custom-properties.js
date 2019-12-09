import {
  toCustomProperties,
  createColorStyles,
} from '../src/custom-properties'

describe('toCustomProperties', () => {
  test('converts theme object to custom properties', () => {
    const result = toCustomProperties({
      colors: {
        text: 'black',
      },
      fonts: {
        body: 'system-ui, sans-serif',
      }
    })
    expect(result).toEqual({
      colors: {
        text: 'var(--theme-ui-colors-text, black)',
      },
      fonts: {
        body: 'var(--theme-ui-fonts-body, system-ui, sans-serif)',
      },
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
        color: 'var(--theme-ui-colors-text, tomato)',
        backgroundColor: 'var(--theme-ui-colors-background, white)',
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
