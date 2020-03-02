import { renderToString } from 'react-dom/server'
import { jsx } from '../src/index'

const render = (sx: Object) =>
  renderToString(
    jsx('div', {
      sx,
    })
  )

test('it throws an error when an invalid CSS property is specified', () => {
  expect(() =>
    render({
      flex: 1,
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify CSS property \\"flex\\"."`
  )
})

test('it handles camelCase', () => {
  expect(() =>
    render({
      justifyContent: 1,
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify CSS property \\"justifyContent\\"."`
  )
})

test('it disallows non-theme values for padding', () => {
  expect(() =>
    render({
      padding: '2px',
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot use a non-theme value \\"2px\\" for \\"padding\\". Please either use a theme value or add a new value to the theme."`
  )
})

test('it allows theme values for padding', () => {
  expect(() =>
    render({
      padding: 3,
    })
  ).not.toThrowError()
})
