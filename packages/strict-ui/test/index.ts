import { renderToString } from 'react-dom/server'
import { jsx, ThemeProvider } from '../src/index'

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
    `"Cannot specify disallowed CSS property \\"flex\\"."`
  )
})

test('it handles camelCase', () => {
  expect(() =>
    render({
      justifyContent: 1,
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify disallowed CSS property \\"justifyContent\\"."`
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

test('it passes valid responsive values', () => {
  expect(() =>
    render({
      padding: [1, 2, 3],
    })
  ).not.toThrowError()
})

test('it fails partially invalid responsive values', () => {
  expect(() =>
    render({
      padding: [1, '3px', 3],
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot use a non-theme value \\"3px\\" for \\"padding\\". Please either use a theme value or add a new value to the theme."`
  )
})

test('it fails shorthands', () => {
  expect(() =>
    render({
      mx: 2,
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify disallowed CSS property \\"mx\\"."`
  )
})

test('it fails marginX', () => {
  expect(() =>
    render({
      marginX: 2,
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Cannot specify disallowed CSS property \\"marginX\\"."`
  )
})

test('it correctly handles theme properties that match their values', () => {
  expect(() =>
    renderToString(
      jsx(
        ThemeProvider,
        {
          theme: {
            colors: {
              red: 'red',
            },
          },
        },
        jsx('div', {
          sx: {
            color: 'red',
          },
        })
      )
    )
  ).not.toThrowError()
})
