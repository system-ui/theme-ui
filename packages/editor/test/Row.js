import React from 'react'
import renderer from 'react-test-renderer'
import Row from '../src/Row'

test('renders', () => {
  const json = renderer.create(
    <Row />
  ).toJSON()
  expect(json).toMatchSnapshot()
})
