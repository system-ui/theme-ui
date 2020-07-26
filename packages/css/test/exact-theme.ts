import { expecter } from 'ts-snippet'

const expectSnippet = expecter(
  (code) => `
  import { css } from './packages/css/src'
  import { makeTheme } from './packages/css/src/exact-theme'

  ${code}
`,
  { strict: true }
)

const AUGMENT_COLORS = `
  const myTheme = makeTheme({
    colors: {
      primary: 'red',
      'primary-dark': 'darkred',
    },
  })

  type MyTheme = typeof myTheme

  declare module './packages/css/src' {
    export interface UserTheme extends MyTheme {}
  }
`

describe('exact theme', () => {
  test("arbitrary color can be passed when we don't augment UserTheme", () => {
    expectSnippet(`
      css({ color: 'hotpink' })
    `).toSucceed()
  })

  test('can be augmented and allows to narrow types for `color`', () => {
    expectSnippet(`
      ${AUGMENT_COLORS}

      css({
        color: 'hotpink',
      })
    `).toFail(
      /^(?=.*Type '"hotpink"' is not assignable to type)(?=.*ThemeUICSSObject)(?=.*"inherit")(?=.*"primary" | "primary-dark").*$/m
    )
  })

  test('infers augmented backgroundColor', () => {
    expectSnippet(`
      ${AUGMENT_COLORS}

      css({
        color: t => {
          const colors = t.colors;
          return Math.random() > 0.5 ? colors.primary : colors['primary-dark']
        }
      })
    `).toInfer('colors', `{ primary: string; 'primary-dark': string; }`)
  })
})
