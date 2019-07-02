import React from 'react'
import { render } from '@testing-library/react'
import CodeBlock from '../src'

const CODE = `
  console.log('hello, world!')
`

test('renders a code block', () => {
  const result = render(<CodeBlock className="language-js">{CODE}</CodeBlock>)

  expect(result).toMatchSnapshot()
})
