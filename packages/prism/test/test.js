import React from 'react'
import { render } from '@testing-library/react'
import Prism from '../src'

const CODE = `
  console.log('hello, world!')
`

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
  console.log(json)
  expect(json).toMatchSnapshot()
})
