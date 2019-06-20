import React from 'react'
import renderer from 'react-test-renderer'
import {
  Box,
  Flex,
  Layout,
  Main,
  Container,
  Header,
  Footer,
} from '../src/layout'

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
