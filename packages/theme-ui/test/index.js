/** @jsx mdx */
import { mdx } from '@mdx-js/react'
import { useContext } from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import { ThemeProvider, Context, Styled, jsx, useColorMode } from '../src/index'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('renders', () => {
  const json = renderJSON(
    <ThemeProvider>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with styles', () => {
  const json = renderJSON(
    <ThemeProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}
    >
      <h1>Hello</h1>
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
})

test('creates non-standard components', () => {
  const json = renderJSON(
    <ThemeProvider
      components={{
        sup: 'sup',
      }}
      theme={{
        styles: {
          sup: {
            color: 'tomato',
          },
        },
      }}
    >
      <sup>hey</sup>
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('styles React components', () => {
  const Beep = props => <h2 {...props} />
  const Inner = props => {
    const context = useContext(Context)
    return mdx(context.components.Beep, props)
  }

  const json = renderJSON(
    <ThemeProvider
      components={{
        Beep,
      }}
      theme={{
        styles: {
          Beep: {
            color: 'tomato',
          },
        },
      }}
    >
      <Inner />
    </ThemeProvider>
  )
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components accept an `as` prop', () => {
  const Beep = props => <h2 {...props} />
  const json = renderJSON(
    <ThemeProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}
    >
      <Styled.h1 as={Beep}>Beep boop</Styled.h1>
    </ThemeProvider>
  )
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

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
