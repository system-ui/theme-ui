import { toCustomProperties, createBodyStyles } from '../src/custom-properties'

const theme = {
  colors: {
    text: 'black',
    background: 'white',
    primary: 'tomato',
    header: {
      icon: 'purple',
    },
    modes: {
      dark: {
        text: 'white',
        background: 'black',
        primary: 'cyan',
      },
      purple: {
        text: 'white',
        background: 'rebeccapurple',
      },
    },
  },
  space: [0, 4, 8, 16, 32],
}

test('converts theme object', () => {
  const next = toCustomProperties(theme)
  expect(next).toEqual({
    colors: {
      text: 'var(--theme-ui-colors-text, black)',
      background: 'var(--theme-ui-colors-background, white)',
      primary: 'var(--theme-ui-colors-primary, tomato)',
      header: {
        icon: 'var(--theme-ui-colors-header-icon, purple)',
      },
      modes: {
        dark: {
          text: 'var(--theme-ui-colors-modes-dark-text, white)',
          background: 'var(--theme-ui-colors-modes-dark-background, black)',
          primary: 'var(--theme-ui-colors-modes-dark-primary, cyan)',
        },
        purple: {
          text: 'var(--theme-ui-colors-modes-purple-text, white)',
          background:
            'var(--theme-ui-colors-modes-purple-background, rebeccapurple)',
        },
      },
    },
    space: [
      // 0, 4, 8, 16, 32
      'var(--theme-ui-space-0, 0px)',
      'var(--theme-ui-space-1, 4px)',
      'var(--theme-ui-space-2, 8px)',
      'var(--theme-ui-space-3, 16px)',
      'var(--theme-ui-space-4, 32px)',
    ],
  })
})
