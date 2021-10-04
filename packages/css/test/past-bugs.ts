import { css, Theme, THEME_UI_DEFAULT_KEY } from '..'

// https://github.com/system-ui/theme-ui/issues/1439
describe('theme scales, get and default object property (#1439)', () => {
  test('scale with default key works', () => {
    const theme: Theme = {
      zIndices: {
        // the value of THEME_UI_DEFAULT_KEY used to be "default"
        default: 0,
        modal: 1,
      },
    }

    const actual = css({ zIndex: 'modal' })(theme)

    expect(actual).toStrictEqual({ zIndex: 1 })
  })

  // We're no longer using `get` to extract scales from the theme.
  test(`scale with __default key works`, () => {
    const theme: Theme = {
      zIndices: {
        [THEME_UI_DEFAULT_KEY]: 0,
        '$sky-high': 1,
      },
    }

    expect(THEME_UI_DEFAULT_KEY).toBe('__default')

    const actual = css({ zIndex: '$sky-high' })(theme)

    expect(actual).toStrictEqual({ zIndex: 1 })
  })
})
