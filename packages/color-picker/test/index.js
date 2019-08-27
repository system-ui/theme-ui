import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { ColorPicker } from '../src'

afterEach(cleanup)

test('renders with styles', () => {
  const json = renderer.create(<ColorPicker color="#f00" />).toJSON()
  expect(json).toMatchSnapshot()
})

// Reakit Popover is not idempotent
test.skip('renders as a popover', () => {
  const json = renderer
    .create(
      <ColorPicker color="#f00">
        <button>Edit color</button>
      </ColorPicker>
    )
    .toJSON()
  expect(json).toMatchSnapshot()
})
