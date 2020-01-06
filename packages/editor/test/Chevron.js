import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import Chevron from '../src/Chevron'

test('renders', () => {
  const json = renderer.create(
    <Chevron />
  ).toJSON()
  expect(json).toMatchSnapshot()
})

