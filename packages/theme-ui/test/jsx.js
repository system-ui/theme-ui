import { jsx, ThemeProvider } from '../src'
import { Fragment } from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('custom pragma adds styles', () => {
  const json = renderJSON(
    jsx('div', {
      sx: {
        mx: 'auto',
        p: 2,
        bg: 'tomato',
      },
    })
  )
  expect(json).toHaveStyleRule('margin-left', 'auto')
  expect(json).toHaveStyleRule('margin-right', 'auto')
  expect(json).toHaveStyleRule('padding', '8px')
  expect(json).toHaveStyleRule('background-color', 'tomato')
})

test.skip('adds raw values with css prop', () => {
  const json = renderJSON(
    jsx('div', {
      css: {
        margin: 4,
      },
    })
  )
  expect(json).toHaveStyleRule('margin', '4px')
})

test.skip('sx and css prop can be used together', () => {
  const json = renderJSON(
    jsx('div', {
      css: {
        margin: 0,
      },
      sx: {
        bg: 'tomato',
      },
    })
  )
  expect(json).toHaveStyleRule('background-color', 'tomato')
  expect(json).toHaveStyleRule('margin', '0')
})

test.skip('custom pragma handles null props', () => {
  const json = renderJSON(jsx('h1', null, 'hello'))
  expect(json).toMatchSnapshot()
})

test.skip('sx prop supports dot notation', () => {
  const json = renderJSON(
    jsx(
      ThemeProvider,
      {
        theme: {
          useCustomProperties: false,
          colors: {
            text: 'black',
            base: {
              blue: ['#07c'],
              primary: 'cyan',
            },
          },
        },
      },
      jsx('div', {
        sx: {
          color: 'base.blue.0',
          backgroundColor: 'base.primary',
        },
      })
    )
  )
  expect(json).toHaveStyleRule('background-color', 'cyan')
  expect(json).toHaveStyleRule('color', '#07c')
})

test.skip('does not add css prop when not provided', () => {
  jest.spyOn(global.console, 'warn')
  const json = renderJSON(jsx(Fragment, null, 'hi'))
  expect(json.props).toEqual(undefined)
  expect(console.warn).not.toBeCalled()
})
