/** @jsx mdx */
import React, { useContext } from 'react'
import { mdx } from '@mdx-js/react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import mockConsole from 'jest-mock-console'
import { ThemeProvider } from '@theme-ui/core'
import {
  themed,
  Styled,
  components,
  MDXProvider,
} from '../src'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('styles React components', () => {
  const Beep = props => <h2 {...props} />
  const Inner = props => mdx('Beep', props)

  const json = renderJSON(
    <ThemeProvider
      theme={{
        styles: {
          Beep: {
            color: 'tomato',
          },
        },
      }}>
      <MDXProvider
        components={{
          Beep,
        }}>
        <Inner />
      </MDXProvider>
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
      }}>
      <MDXProvider>
        <Styled.h1 as={Beep}>Beep boop</Styled.h1>
      </MDXProvider>
    </ThemeProvider>
  )
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components with `as` prop receive all props', () => {
  const Beep = props => <div {...props} />
  const json = renderJSON(<Styled.a as={Beep} activeClassName="active" />)
  expect(json.type).toBe('div')
  expect(json.props.activeClassName).toBe('active')
})

test('cleans up style props', () => {
  const json = renderJSON(
    <Styled.h1 mx={2} id='test'>
      Hello
    </Styled.h1>
  )
  expect(json.props.id).toBe('test')
  expect(json.props.mx).not.toBeDefined()
})
