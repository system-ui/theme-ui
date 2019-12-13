import React from 'react'
import renderer from 'react-test-renderer'
import Prism from '../src'

const CODE = `
  console.log('hello, world!')
`

const render = el => renderer.create(el).toJSON()

test('renders a code block', () => {
  const result = render(<Prism className="language-js">{CODE}</Prism>)

  expect(result).toMatchSnapshot()
})

test('renders with other languages', () => {
  const json = render(
    <Prism
      className='language-php'
      children='<h1>Hello</h1>'
    />
  )
  expect(json).toMatchSnapshot()
})
