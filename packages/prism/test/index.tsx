/**
 * @jest-environment jsdom
 */

import React, { ReactElement } from 'react'
import renderer from 'react-test-renderer'
import Prism from '../src'

const CODE = `
  console.log('hello, world!')
`

const render = (el: ReactElement) => renderer.create(el).toJSON()

test('renders a code block', () => {
  const result = render(<Prism className="language-js">{CODE}</Prism>)

  expect(result).toMatchSnapshot()
})

test('renders with other languages', () => {
  const json = render(
    <Prism className="language-php" children="<h1>Hello</h1>" />
  )
  expect(json).toMatchSnapshot()
})

const HIGHLIGHT_CODE = `
 console.log('hello, world!') // highlight-line
`

test('highlights inline comment', () => {
  const result = render(<Prism className="language-js">{HIGHLIGHT_CODE}</Prism>)
  expect(result).toMatchSnapshot()
})

const HIGHLIGHT_START_END = `
  // highlight-start
 console.log('hello, world!') 
 // highlight-end
 let other = "no highlight"
`

test('highlight start and end', () => {
  const result = render(
    <Prism className="language-js">{HIGHLIGHT_START_END}</Prism>
  )

  expect(result).toMatchSnapshot()
})

const NO_HIGHLIGHT = `
  // highlight-start
 console.log('hello, world!') 
`

test('no highlight', () => {
  const result = render(<Prism className="language-js">{NO_HIGHLIGHT}</Prism>)

  expect(result).toMatchSnapshot()
})

const MULTIPLE_HIGHLIGHTS_START_END = `
  // highlight-start
  // i am highlighted!
  // highlight-end

  // no highlight here ...

  // highlight-start 
  // i am highlighted, and
  // so am i!
  // highlight-end

  // no highlight here either ...
`

test('multiple highlights start and end', () => {
  const result = render(
    <Prism className="language-js">{MULTIPLE_HIGHLIGHTS_START_END}</Prism>
  )

  expect(result).toMatchSnapshot()
})
