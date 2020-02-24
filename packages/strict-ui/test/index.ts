import { jsx } from '../src/index'

test('it throws an error when an invalid CSS property is specified', () => {
  expect(() =>
    jsx('div', {
      sx: {
        flex: 1,
      },
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify CSS property \\"flex\\"."`
  )
})
