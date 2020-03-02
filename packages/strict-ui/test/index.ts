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

test('it handles dash-case', () => {
  expect(() =>
    jsx('div', {
      sx: {
        'justify-content': 1,
      },
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify CSS property \\"justify-content\\"."`
  )
})

test('it handles camelCase', () => {
  expect(() =>
    jsx('div', {
      sx: {
        justifyContent: 1,
      },
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify CSS property \\"justifyContent\\"."`
  )
})
