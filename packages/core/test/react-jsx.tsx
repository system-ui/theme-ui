/** @jsx jsx */
import { renderJSON, NotHas, Assert, IsExact } from '@theme-ui/test-utils'

import { jsx, SxProps, WithConditionalSxProp } from '../src'

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
        />
      )
    ).toMatchSnapshot()
  })
})

{
  type HasSxProp<T extends SxProps> = T extends SxProps ? true : false
  type DoesNotHaveSxProp<T extends object> = NotHas<T, 'sx'>

  type _ =
    | Assert<
        DoesNotHaveSxProp<WithConditionalSxProp<{ className?: undefined }>>,
        true
      >
    | Assert<
        | HasSxProp<WithConditionalSxProp<{ className?: string }>>
        | HasSxProp<WithConditionalSxProp<{ className: string }>>
        // if `className` can be whatever, we have `sx` prop
        | HasSxProp<WithConditionalSxProp<{ className?: unknown }>>
        // if `className` can be string or many, we have `sx` prop
        | HasSxProp<
            WithConditionalSxProp<{
              className?: string | string[]
            }>
          >,
        true
      >
}

{
  // Unfortunately, we have to assume that all `sx` props are for us,
  // as we can't check "does this component accept className or css?"
  // at runtime
  type _ = Assert<IsExact<WithConditionalSxProp<{ sx: 200 }>, {}>, true>
}
