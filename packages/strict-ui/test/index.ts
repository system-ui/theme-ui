import { renderToString } from 'react-dom/server'
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

test('it disallows non-theme values for padding', () => {
  expect(() =>
    renderToString(
      jsx('div', {
        sx: {
          padding: '2px',
        },
      })
    )
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot use a non-theme value \\"2px\\" for \\"padding\\". Please either use a theme value or add a new value to the theme."`
  )
})

test('it allows theme values for padding', () => {
  expect(() =>
    renderToString(
      jsx('div', {
        sx: {
          padding: 3,
        },
      })
    )
  ).not.toThrowError()
})
