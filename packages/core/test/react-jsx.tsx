/** @jsx jsx */
import { renderJSON, NotHas, Assert, IsExact } from '@theme-ui/test-utils'

import { jsx, SxProp, ThemeUIJSX } from '../src'

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
          }}>
          <input
            onChange={(e) => console.log(e.target.value)}
            sx={{
              bgColor: 'primary',
            }}
          />
        </div>
      )
    ).toMatchSnapshot()
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
