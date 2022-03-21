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

import { themed, Themed, components, MDXProvider } from '../src'

expect.extend(matchers)

test('styles React components', () => {
  const Beep = (props: React.ComponentPropsWithoutRef<'h2'>) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
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

test('themed extracts styles from the theme', () => {
  expect(
    themed('footer')({ styles: { footer: { background: 'skyblue' } } })
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
