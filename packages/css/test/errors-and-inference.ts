import { expecter } from '@theme-ui/test-utils'

import { css, get, Theme } from '../src'

const expectSnippet = expecter(`
  import { css } from './packages/css/src'
`)

describe('Theme', () => {
  test('shows friendly error only on bad property', () => {
    expectSnippet(`
      css({
        bg: 'salmon',
        whiteSpace: 'no-works',
        '> form': {
          color: 'blue',
          widows: 'bar',
          // unknown CSS property is accepted
          whitePace: 'this-works',
        },
      })
    `).toFail(
      /Error snippet\.tsx \(\d+,\d+\): Type '"no-works"' is not assignable to type [\s\S]+'./
    )
  })

  test('shows friendly error on nested object', () => {
    expectSnippet(`
      css({
        bg: 'salmon',
        '> form': {
          color: 'blue',
          whiteSpace: 'banana',
        },
      })
    `).toFail(
      new RegExp(
        `Error snippet\\.tsx \\(\\d+,\\d+\\): Type '{ color: "blue"; whiteSpace: "banana"; }'` +
          ` is not assignable to type '[\\s\\S]+'.\\n\\s+` +
          `Types of property 'whiteSpace' are incompatible.\\n\\s+` +
          `Type '"banana"' is not assignable to type [\\s\\S]+`
      )
    )
  })

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
    `).toInfer('theme', 'Theme')
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
    css({
      size: (t) => parse(t.space?.[3]) + parse(t.sizes?.[5]),
    })

    // Current limitation. If you broke this one, that's actually pretty awesome,
    // but TypeScript chapter in the docs needs an update.
    expectSnippet(`
      css({ size: (t) => t.space?.['xs'] + t.sizes?.['lg'] })
    `).toFail(
      /Element implicitly has an 'any' type because index expression is not of type 'number'/
    )
  })
})

// This is not a feature, but the TypeScript chapter in the docs will need an
// update if this test fails.
test('inferred type `string` is too wide for `whiteSpace`', () => {
  expectSnippet(`
    const style = {
      whiteSpace: 'pre-line'
    }

    css(style);
  `).toFail(
    /Type '{ whiteSpace: string; }' is not assignable to type 'ThemeUICSSObject'./
  )

  expectSnippet(`
    import { ThemeUICSSObject } from './packages/css'

    const style: ThemeUICSSObject = {
      whiteSpace: 'pre-line'
    }

    css(style);
  `).toSucceed()
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
