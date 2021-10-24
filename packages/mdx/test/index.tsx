/**
 * @jest-environment jsdom
 * @jsx mdx
 */

import React from 'react'
import { mdx } from '@mdx-js/react'
import { render } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import mockConsole from 'jest-mock-console'
import { ThemeProvider } from '@theme-ui/core'
import { renderJSON } from '@theme-ui/test-utils'

import { themed, Themed, Styled, components, MDXProvider } from '../src'

expect.extend(matchers)

test('styles React components', () => {
  const Beep = (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 {...props} />
  )
  const Inner = (props: React.ComponentPropsWithoutRef<typeof Beep>) =>
    mdx('Beep', props)

  const json = renderJSON(
    <ThemeProvider
      theme={{
        styles: {
          Beep: {
            color: 'tomato',
          },
        },
      }}
    >
      <MDXProvider
        components={{
          Beep,
        }}
      >
        <Inner />
      </MDXProvider>
    </ThemeProvider>
  )!
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components accept an `as` prop', () => {
  const Beep = (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 {...props} />
  )
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
      <MDXProvider>
        <Themed.h1 as={Beep}>Beep boop</Themed.h1>
      </MDXProvider>
    </ThemeProvider>
  )!
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components with `as` prop receive all props', () => {
  const Beep = (props: React.ComponentPropsWithoutRef<'div'>) => (
    <div {...props} />
  )
  const json = renderJSON(<Themed.a as={Beep} activeClassName="active" />)!
  expect(json.type).toBe('div')
  expect(json.props.activeClassName).toBe('active')
})

test('cleans up style props', () => {
  const json = renderJSON(
    // @ts-expect-error
    <Themed.h1 mx={2} id="test">
      Hello
    </Themed.h1>
  )!
  expect(json.props.id).toBe('test')
  expect(json.props.mx).not.toBeDefined()
})

test('themed extracts styles from the theme', () => {
  expect(
    themed('footer')({
      theme: { styles: { footer: { background: 'skyblue' } } },
    })
  ).toStrictEqual({ background: 'skyblue' })
})

test('keys of components match snapshot', () => {
  expect(Object.keys(components)).toMatchInlineSnapshot(`
    Array [
      "p",
      "b",
      "i",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "pre",
      "code",
      "ol",
      "ul",
      "li",
      "blockquote",
      "hr",
      "em",
      "table",
      "tr",
      "th",
      "td",
      "strong",
      "del",
      "inlineCode",
      "thematicBreak",
      "div",
      "root",
    ]
  `)
})

test('opt out of typechecking props whenever `as` prop is used', () => {
  expect(
    renderJSON(
      <div>
        {/* no error */}
        <Themed.img
          as="button"
          src={2}
          onClick={(_event) => {
            // @ts-ignore todo: this fails in tests, but it shouldn't.
            _event.x = 2
          }}
        />
        <Themed.img
          // @ts-expect-error Type 'number' is not assignable to type 'string'.ts(2322)
          src={2}
          onClick={(_event) => {
            // @ts-expect-error Property 'y' does not exist on type 'MouseEvent<HTMLImageElement, MouseEvent>'.ts(2339)
            _event.y = 2
          }}
        />
      </div>
    )
  ).toMatchInlineSnapshot(`
    <div>
      <button
        className="emotion-0"
        onClick={[Function]}
        src={2}
      />
      <img
        className="emotion-0"
        onClick={[Function]}
        src={2}
      />
    </div>
  `)
})

test('table columns align', () => {
  const tree = render(
    <MDXProvider>
      <Themed.table>
        <thead>
          <Themed.tr>
            <Themed.th align="left">Left</Themed.th>
            <Themed.th align="center">Center</Themed.th>
            <Themed.th align="right">Right</Themed.th>
          </Themed.tr>
        </thead>
        <tbody>
          <Themed.tr>
            <Themed.td align="left">TextLeft</Themed.td>
            <Themed.td align="center">TextCenter</Themed.td>
            <Themed.td align="right">TextRight</Themed.td>
          </Themed.tr>
        </tbody>
      </Themed.table>
    </MDXProvider>
  )
  expect(tree.getByText('Left')).toHaveStyleRule('text-align', 'left')
  expect(tree.getByText('Center')).toHaveStyleRule('text-align', 'center')
  expect(tree.getByText('Right')).toHaveStyleRule('text-align', 'right')
  expect(tree.getByText('TextLeft')).toHaveStyleRule('text-align', 'left')
  expect(tree.getByText('TextCenter')).toHaveStyleRule('text-align', 'center')
  expect(tree.getByText('TextRight')).toHaveStyleRule('text-align', 'right')
})

test('Warn deprecated Styled', () => {
  const restore = mockConsole()
  const tree = render(
    <ThemeProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}
    >
      <MDXProvider>
        <Styled.inlineCode>styled</Styled.inlineCode>
      </MDXProvider>
    </ThemeProvider>
  )!
  const code = tree.getByText('styled')
  expect(code).toMatchInlineSnapshot(`
  <code
    class="emotion-0"
  >
    styled
  </code>
`)
  expect(console.warn).toHaveBeenCalled()
  restore()
})

test('Deprecated Styled test', () => {
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
      <MDXProvider>
        <Styled.h1>H1</Styled.h1>
      </MDXProvider>
    </ThemeProvider>
  )!
  expect(json.type).toBe('h1')
  expect(json).toHaveStyleRule('color', 'tomato')
})
