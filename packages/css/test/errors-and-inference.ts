import { expecter } from '@theme-ui/test-utils'

import { css, get, Theme } from '../src'

const expectSnippet = expecter(`
  import { css } from './packages/css/src'
`)

describe('Theme', () => {
  test('accepts unknown CSS property without error', () => {
    expect(css({ '> form': { windows: 'baz' } })({})).toStrictEqual({
      '> form': { windows: 'baz' },
    })
  })

  test('infers Theme argument in computed style function', () => {
    expectSnippet(`
      import { get } from './packages/css'

      css({
        p: t => {
          const theme = t;
          return get(t, 'sizes.5')
        }
      })
    `).toInfer('theme', 'Theme<{}>')
  })

  test('accepts additional properties by declaration merging', () => {
    expectSnippet(`
      import { Theme } from './packages/css';

      interface MySyntaxHighlightingTheme {
        foreground: string
      }

      declare module './packages/css' {
        interface Theme {
          syntaxHighlighting?: MySyntaxHighlightingTheme
        }
      }

      const theme: Theme = {
        syntaxHighlighting: {
          foreground: '#222',
        },
      }

      const syntaxHighlighting = theme.syntaxHighlighting!
    `).toInfer('syntaxHighlighting', 'MySyntaxHighlightingTheme')
  })

  test('works as described in the docs', () => {
    const _theme: Theme = {
      colors: { background: 'white', text: 'black', primary: '#07f' },
      space: [0, 8, 16, 32, 64, 128, 256],
      sizes: [0, 8, 16, 32, 64, 128, 256],
    }

    css({ size: (t) => get(t, 'space.3') + get(t, 'sizes.5') })

    const parse = (x: string | number | undefined | {}) => parseInt(String(x))

    // Current limitation. If you broke this one, that's actually pretty awesome,
    // but TypeScript chapter in the docs needs an update.
    expectSnippet(`
      css({ size: (t) => t.space?.['xs'] + t.sizes?.['lg'] })
    `).toFail(
      /Element implicitly has an 'any' type because index expression is not of type 'number'/
    )
  })
})

describe('ColorMode', () => {
  const expectedSnippet = expectSnippet(`
    import { ColorMode } from './packages/css/src'

    const colorMode: ColorMode = {}

    const seriousPink = colorMode.seriousPink
    if (Array.isArray(seriousPink)) {
      const [light, medium, dark] = seriousPink
    }
  `)

  expectedSnippet.toInfer('light', 'Color')
  expectedSnippet.toInfer('dark', 'Color')
})
