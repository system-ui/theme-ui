import { expecter } from 'ts-snippet'

// import { css } from '../src'
// import { makeTheme } from '../src/exact-theme'

// const myTheme = makeTheme({
//   colors: {
//     orange: [
//       null,
//       '#fffaf0',
//       '#feebc8',
//       '#fbd38d',
//       '#f6ad55',
//       '#ed8936',
//       '#dd6b20',
//       '#c05621',
//       '#9c4221',
//       '#7b341e',
//     ],
//     gray: {
//       50: 'rgb(8, 8, 8)',
//       75: 'rgb(26, 26, 26)',
//       100: 'rgb(30, 30, 30),',
//       150: null as null,
//       200: undefined as undefined,
//     },
//   },
//   space: {
//     we: {
//       have: {
//         to: {
//           go: {
//             deeper: '1234px',
//           },
//         },
//       },
//     },
//   },
//   options: {
//     strictMode: {
//       allowStrings: true
//     }
//   }
// })

// type MyTheme = typeof myTheme

// declare module '../src' {
//   export interface UserTheme extends MyTheme {}
// }

import { Color, Space } from '../src/scales'

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

  describe('scale properties', () => {
    const theme = `
      const myTheme = makeTheme({
        sizes: [4, 8, 16, 32, 64, 128],
        space: { $1: 2, $2: 4, $3: 16, $4: 32 },
        borders: {
          thick: '4px solid black',
          'dashed-primary': '2px dashed primary',
        },
        fonts: {
          monospace: 'Fira Code',
          heading: 'Cooper Black',
          body:
            '-apple-system, "Segoe UI", system-ui, BlinkMacSystemFont, ' +
            'Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", ' +
            '"Droid Sans", "Helvetica Neue", sans-serif',
        },
        opacities: {
          transparent: 0,
          translucent: 0.6,
          full: 1,
        },
        fontSizes: Object.assign(
          [
            '0.727rem',
            '0.8rem',
            '1rem',
            '1.25rem',
            '1.563rem',
            '1.953rem',
            '2.441rem',
            '3.052rem',
            '3.815rem',
            '4.768rem',
          ],
          { '-1': '0.64rem', '-2': '0.512rem' }
        ),
        fontWeights: {
          body: 400,
          heading: 800,
          bold: 600,
        },
        lineHeights: {
          'body-text': 1.65,
          headings: 1.25,
          'code-blocks': 1.5,
        },
      })
    `

    const augmentation = `
      type MyTheme = typeof myTheme

      declare module './packages/css/src' {
        export interface UserTheme extends MyTheme {}
      }
    `

    const scalesTest = `
      css({
        opacity: 'kinda transparent',
        margin: 'enough',
        width: 'about right',
        border: 'none at all'
      })
    `

    test('arbitrary values are accepted without "strict mode" module augmentation', () => {
      expectSnippet(`
        ${theme}
        ${scalesTest}
      `).toSucceed()
    })

    test('error messages match snippets', () => {
      expectSnippet(`
        ${theme}
        ${augmentation}
        ${scalesTest}
      `).toFail(
        /Error snippet.ts (\d+,\d+): Type '"kinda transparent"' is not assignable to type '"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "transparent" | "translucent" | "full"[\s\S]*/
      )
    })
  })

  describe('scale dotted paths', () => {
    const a = `\
      const myTheme = makeTheme({
        colors: {
          orange: [
            null,
            '#fffaf0',
            '#feebc8',
            '#fbd38d',
            '#f6ad55',
            '#ed8936',
            '#dd6b20',
            '#c05621',
            '#9c4221',
            '#7b341e',
          ],
          gray: {
            50: 'rgb(8, 8, 8)',
            75: 'rgb(26, 26, 26)',
            100: 'rgb(30, 30, 30),',
            150: null as null,
            200: undefined as undefined,
          },
          blue: {
            we: {
              have: {
                to: {
                  go: {
                    deeper: '#00f'
                  }
                }
              }
            } 
          }
        },
      })
      
      type MyTheme = typeof myTheme
      
      declare module '../src' {
        export interface UserTheme extends MyTheme {}
      }`
  })
})
