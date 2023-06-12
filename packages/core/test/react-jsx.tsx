/**
 * @jest-environment jsdom
 * @jsxImportSource ../src
 */
/* eslint-disable no-lone-blocks */
import { renderJSON, NotHas, Assert, expecter } from '@theme-ui/test-utils'

import { SxProp, ThemeUIJSX } from '../src'

describe('JSX', () => {
  test('accepts sx prop', () => {
    expect(
      renderJSON(
        <div
          sx={{
            // TypeScript support should autocomplete keys here
            mt: 10,
            px: 2,
            scrollPaddingY: 2,
          }}
        >
          <input
            onChange={(e) => console.log(e.target.value)}
            sx={{
              bg: 'primary',
            }}
          />
        </div>
      )
    ).toMatchSnapshot()
  })

  test('accepts css prop', () => {
    const expectSnippet = expecter(
      `/** @jsxImportSource ./packages/core */

      export {}`,
      { jsx: false }
    )

    expectSnippet(`const _1 = <div css={{ color: 'red' }} />`).toSucceed()

    // TODO: uncomment this some day
    // // Theme UI theme can be injected to @emotion/react module in userspace
    // expectSnippet(
    //   `
    //   import { Theme as ThemeUITheme } from './packages/css'

    //   declare module '@emotion/react' {
    //     export interface Theme extends ThemeUITheme {}
    //   }

    //   <div
    //      css={(t) => {
    //        const _t = t;
    //        return {}
    //      }}
    //    />`
    // ).toInfer('_t', 'Theme')

    expectSnippet(
      `import { css } from '@emotion/react'

       const TestComponent = () => <div css={css\`display: block;\`} />`
    ).toSucceed()
  })
})

{
  type HasSxProp<T extends SxProp> = T extends SxProp ? true : false
  type DoesNotHaveSxProp<T extends object> = NotHas<T, 'sx'>

  type _ =
    | Assert<
        DoesNotHaveSxProp<
          ThemeUIJSX.LibraryManagedAttributes<
            React.FC,
            { className?: undefined }
          >
        >,
        true
      >
    | Assert<
        | HasSxProp<
            ThemeUIJSX.LibraryManagedAttributes<
              React.FC,
              { className?: string; anotherProp: string; andOneMore: number }
            >
          >
        | HasSxProp<
            ThemeUIJSX.LibraryManagedAttributes<React.FC, { className: string }>
          >
        // if `className` can be whatever, we have `sx` prop
        | HasSxProp<
            ThemeUIJSX.LibraryManagedAttributes<
              React.FC,
              { className?: unknown }
            >
          >
        // if `className` can be string or many, we have `sx` prop
        | HasSxProp<
            ThemeUIJSX.LibraryManagedAttributes<
              React.FC,
              {
                className?: string | string[]
              }
            >
          >,
        true
      >
}
