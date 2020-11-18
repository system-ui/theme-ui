/** @jsx mdx */
import { mdx } from '@mdx-js/react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import { ThemeProvider } from '@theme-ui/core'
import { renderJSON } from '@theme-ui/test-utils'

import { themed, Styled, components, MDXProvider } from '../src'

expect.extend(matchers)

test('styles React components', () => {
  const Beep = (props) => <h2 {...props} />
  const Inner = (props) => mdx('Beep', props)

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
  )!
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components accept an `as` prop', () => {
  const Beep = (props) => <h2 {...props} />
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
  )!
  expect(json.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('components with `as` prop receive all props', () => {
  const Beep = (props) => <div {...props} />
  const json = renderJSON(<Styled.a as={Beep} activeClassName="active" />)!
  expect(json.type).toBe('div')
  expect(json.props.activeClassName).toBe('active')
})

test('cleans up style props', () => {
  const json = renderJSON(
    // @ts-expect-error
    <Styled.h1 mx={2} id="test">
      Hello
    </Styled.h1>
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
        <Styled.img
          as="button"
          src={2}
          onClick={(_event) => {
            // @ts-ignore todo: this fails in tests, but it shouldn't.
            _event.x = 2
          }}
        />
        <Styled.img
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
