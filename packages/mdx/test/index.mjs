/**
 * @jest-environment jsdom
 *
 * This is .mjs, because we need to test the interaction with @mdx-js/mdx, an ESM-only module.
 */

import React from 'react'
// @ts-expect-error you're not supposed to import those two usually
import { jsx, jsxs, Fragment } from 'react/jsx-runtime'

import { render } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { ThemeProvider } from '@theme-ui/core'
import { renderJSON } from '@theme-ui/test-utils'

import * as mdx from '@mdx-js/mdx'
import { useMDXComponents, MDXProvider } from '@mdx-js/react'

import { themed, Themed, components, useThemedStylesWithMdx } from '../src'
// import { MDXProvider, useMDXComponents } from '@mdx-js/react'
// import * as mdx from '@mdx-js/mdx'

expect.extend(matchers)

const evalMdx = async (str) => {
  return mdx.evaluate(str, { useMDXComponents, jsx, jsxs, Fragment })
}

describe(useThemedStylesWithMdx.name, () => {
  it.only('styles React components used in MDX', async () => {
    const Beep = (props) => <p {...props} />

    const { default: BlogPost } = await evalMdx(`
      # The Heading

      <Beep>Lorem ipsum</Beep>
    `)

    function MyProvider({ children }) {
      const components = useThemedStylesWithMdx(useMDXComponents({ Beep }))

      return (
        <ThemeProvider
          theme={{
            styles: {
              h1: { backgroundColor: 'salmon' },
              Beep: { color: 'tomato' },
            },
          }}
        >
          <MDXProvider components={components}>{children}</MDXProvider>
        </ThemeProvider>
      )
    }

    const { container } = render(
      <MyProvider>
        <BlogPost />
      </MyProvider>
    )

    const h1 = container.firstElementChild
    expect(h1.nodeName).toBe('H1')
    expect(h1.textContent).toBe('The Heading')
    expect(window.getComputedStyle(h1).backgroundColor).toBe('salmon')

    const p = container.lastElementChild
    expect(p.nodeName).toBe('P')
    expect(p.textContent).toBe('Lorem ipsum')
    expect(window.getComputedStyle(p).color).toBe('tomato')
  })
})

test('Themed.div accepts .sx prop', async () => {
  const tree = render(
    <ThemeProvider theme={{ colors: { primary: 'blue' } }}>
      <Themed.div sx={{ color: 'primary' }}>blue text</Themed.div>
    </ThemeProvider>
  )

  const div = await tree.findByText('blue text')
  const style = global.getComputedStyle(div)

  expect(style.color).toBe('blue')
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

test('table columns align', async () => {
  const { MDXProvider } = await import('@mdx-js/react')

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
