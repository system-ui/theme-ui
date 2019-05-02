/** @jsx mdx */
import { mdx } from '@mdx-js/react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import {
  ComponentProvider,
  Styled,
  useComponents,
  jsx,
} from './index'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('renders', () => {
  const json = renderJSON(
    <ComponentProvider>
      <h1>Hello</h1>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with styles', () => {
  const json = renderJSON(
    <ComponentProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato'
          }
        }
      }}>
      <h1>Hello</h1>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with useComponents', () => {
  let components
  const Beep = props => {
    components = useComponents()
    return false
  }
  const json = renderJSON(
    <ComponentProvider>
      <Beep />
    </ComponentProvider>
  )
  expect(typeof components).toBe('object')
  expect(components.h1).toBeTruthy()
})

test('creates non-standard components', () => {
  const json = renderJSON(
    <ComponentProvider
      components={{
        sup: 'sup',
      }}
      theme={{
        styles: {
          sup: {
            color: 'tomato'
          }
        }
      }}>
      <sup>hey</sup>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('styles React components', () => {
  const Beep = props => <h2 {...props} />
  const Inner = props => {
    const Styled = useComponents()
    return <Styled.Beep {...props} />
  }
  const json = renderJSON(
    <ComponentProvider
      components={{
        Beep,
      }}
      theme={{
        styles: {
          Beep: {
            color: 'tomato'
          }
        }
      }}>
      <Inner />
    </ComponentProvider>
  )
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components accept an `as` prop', () => {
  const Beep = props => <h2 {...props} />
  const json = renderJSON(
    <ComponentProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato',
          }
        }
      }}>
      <Styled.h1 as={Beep}>Beep boop</Styled.h1>
    </ComponentProvider>
  )
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('custom pragma adds styles', () => {
  const json = renderJSON(
    jsx('div', {
      mx: 'auto',
      p: 2,
      css: {
        bg: 'tomato',
      }
    })
  )
  expect(json).toHaveStyleRule('margin-left', 'auto')
  expect(json).toHaveStyleRule('margin-right', 'auto')
  expect(json).toHaveStyleRule('padding', '8px')
  expect(json).toHaveStyleRule('background-color', 'tomato')
})

test('custom pragma removes styled-system props', () => {
  const json = renderJSON(
    jsx('div', {
      m: 0,
      mx: 'auto',
      mb: 4,
      p: 2,
      px: 5
    })
  )
  expect(json.props.m).toBe(undefined)
  expect(json.props.mx).toBe(undefined)
  expect(json.props.mb).toBe(undefined)
  expect(json.props.p).toBe(undefined)
  expect(json.props.px).toBe(undefined)
})
