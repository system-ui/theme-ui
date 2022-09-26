/**
 * @jest-environment jsdom
 * @jsxImportSource react
 *
 * @file integration tests with @mdx-js/mdx@^2
 *
 * This is an .mjs file, because mdx-js/mdx is an ESM-only module.
 */
// @ts-check
/* eslint-disable react/jsx-pascal-case */

import { render } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { ThemeProvider } from '@theme-ui/core'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'

import { useMDXComponents, MDXProvider } from '@mdx-js/react-v2'

import { useThemedStylesWithMdx } from '../src'

import { evalMdx } from './__test-utils__/evalMdx.mjs'
import { renderJSON } from '@theme-ui/test-utils'

expect.extend(matchers)

describe(`${useThemedStylesWithMdx.name} with MDX v2`, () => {
  it('styles intrinsic h1 and a functional component used in MDX', async () => {
    /** @type {(props: {}) => JSX.Element} */
    const Beep = (props) => <p {...props} />

    const BlogPost = await evalMdx(`
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
    expect(h1?.nodeName).toBe('H1')
    expect(h1?.textContent).toBe('The Heading')
    expect(h1 && window.getComputedStyle(h1).backgroundColor).toBe('salmon')

    const p = container.lastElementChild
    expect(p?.nodeName).toBe('P')
    expect(p?.textContent).toBe('Lorem ipsum')
    expect(p && window.getComputedStyle(p).color).toBe('tomato')
  })

  it('grabs theme.styles from a nested theme provider', async () => {
    function MyMdxProvider({ children }) {
      const components = useThemedStylesWithMdx(useMDXComponents())

      return <MDXProvider components={components}>{children}</MDXProvider>
    }

    const BlogPost = await evalMdx(`
      ## Heading
    `)

    render(
      <ThemeUIProvider
        theme={{
          config: { useCustomProperties: false },
          styles: { h2: { color: 'blue' } },
        }}
      >
        <MyMdxProvider>
          <ThemeUIProvider theme={{ styles: { h2: { color: 'cyan' } } }}>
            <BlogPost />
          </ThemeUIProvider>
        </MyMdxProvider>
      </ThemeUIProvider>
    )
  })

  it('styles hijacked intrinsic components', async () => {
    function MyProvider({ children }) {
      const components = useThemedStylesWithMdx(
        useMDXComponents({
          h1: ({ children, ...rest }) => {
            const props = /** @type {any} */ (rest)
            return <pre {...props}># {children}</pre>
          },
        })
      )

      return (
        <ThemeProvider
          theme={{
            config: { useCustomProperties: false },
            styles: { h1: { color: 'tomato' } },
          }}
        >
          <MDXProvider components={components}>{children}</MDXProvider>
        </ThemeProvider>
      )
    }

    const BlogPost = await evalMdx(`
      # Heading
    `)

    const json = renderJSON(
      <MyProvider>
        <BlogPost />
      </MyProvider>
    )

    expect(json).toHaveStyleRule('color', 'tomato')
    expect(json?.type).toBe('pre')
  })
})
