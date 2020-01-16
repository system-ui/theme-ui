/** @jsx jsx */
import React from 'react'
import { jsx } from '@theme-ui/core'
import { mdx } from '@mdx-js/react'
import renderer from 'react-test-renderer'
import { render, cleanup } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import { ThemeProvider } from '../src'

expect.extend(matchers)

afterEach(cleanup)

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
          primary: 'tomato',
        },
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
            },
          },
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

test('renders global styles', () => {
  const root = render(
    <ThemeProvider
      theme={{
        fonts: {
          body: 'Georgia,serif',
        },
        lineHeights: {
          body: 1.5,
        },
        fontWeights: {
          body: 500,
        },
        styles: {
          root: {
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body',
          },
        },
      }}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.fontFamily).toBe('Georgia,serif')
  expect(style.fontWeight).toBe('500')
  expect(style.lineHeight).toBe('1.5')
})

test('resets body margin', () => {
  const root = render(
    <ThemeProvider>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.margin).toBe('0px')
})

test('does not render invalid global styles', () => {
  const root = render(
    <ThemeProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.fontFamily).toBe('')
  expect(style.fontWeight).toBe('')
  expect(style.lineHeight).toBe('')
})

test('does not renders global styles', () => {
  const root = render(
    <ThemeProvider
      theme={{
        useBodyStyles: false,
        fonts: {
          body: 'Georgia,serif',
        },
        lineHeights: {
          body: 1.5,
        },
        fontWeights: {
          body: 500,
        },
        styles: {
          root: {
            fontFamily: 'body',
          },
        },
      }}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.fontFamily).toBe('')
  expect(style.fontWeight).toBe('')
  expect(style.lineHeight).toBe('')
})

test('adds box-sizing: border-box', () => {
  const root = render(
    <ThemeProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.boxSizing).toBe('border-box')
})

test('does not add box-sizing: border-box', () => {
  const styles = [].slice.call(document.querySelectorAll('style'))
  styles.forEach(style => (style.innerHTML = ''))
  const root = render(
    <ThemeProvider
      theme={{
        useBorderBox: false,
      }}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.boxSizing).toBe('')
})
