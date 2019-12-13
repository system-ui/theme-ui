/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { mdx } from '@mdx-js/react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import { ThemeProvider } from '../src'

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

test('renders with theme', () => {
  const json = renderJSON(
    <ThemeProvider
      theme={{
        useCustomProperties: false,
        colors: {
          primary: 'tomato'
        }
      }}>
      <h1 sx={{ color: 'primary' }}>Hello</h1>
    </ThemeProvider>
  )
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('renders with styles', () => {
  const json = renderJSON(
    <ThemeProvider
      theme={{
        useCustomProperties: false,
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}>
      {mdx('h1', null, 'Hello')}
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('renders with nested provider', () => {
  const json = renderJSON(
    <ThemeProvider
      theme={{
        useCustomProperties: false,
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}>
      <ThemeProvider
        theme={{
          styles: {
            h1: {
              color: 'cyan',
            }
          }
        }}>
        {mdx('h1', null, 'Hello')}
      </ThemeProvider>
    </ThemeProvider>
  )
  expect(json).toHaveStyleRule('color', 'cyan')
})

test('renders with custom components', () => {
  const h1 = props => <pre {...props} />

  const json = renderJSON(
    <ThemeProvider
      components={{
        h1,
      }}
      theme={{
        useCustomProperties: false,
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}>
      {mdx('h1', null, 'Hello')}
    </ThemeProvider>
  )
  expect(json).toHaveStyleRule('color', 'tomato')
  expect(json.type).toBe('pre')
})
