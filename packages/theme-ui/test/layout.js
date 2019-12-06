import React from 'react'
import renderer from 'react-test-renderer'
import { render, cleanup } from '@testing-library/react'
import {
  Box,
  Flex,
  Layout,
  Main,
  Container,
  Header,
  Footer,
} from '../src/layout'

afterEach(cleanup)

test.each([
  ['Box', Box],
  ['Flex', Flex],
  ['Layout', Layout],
  ['Main', Main],
  ['Container', Container],
  ['Header', Header],
  ['Footer', Footer],
])('renders %s', (a, Component) => {
  const json = renderer.create(<Component />).toJSON()
  expect(json).toMatchSnapshot()
})

test.skip('forwards ref to div', () => {
  const ref = React.createRef(null)
  const tree = render(<Box ref={ref} />)
  expect(ref.current.tagName).toBe('DIV')
})
