import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import Combobox from '../src/Combobox'

afterEach(cleanup)

test('renders', () => {
  const json = renderer.create(
    <Combobox />
  ).toJSON()
  expect(json).toMatchSnapshot()
})

test('clicking chevron button shows menu', async () => {
  const tree = render(
    <Combobox
      label='Beep'
      name='beep'
      options={[
        'beep',
        'boop',
      ]}
    />
  )
  const button = await tree.getByRole('button')
  fireEvent.click(button)
  const options = await waitForElement(() => tree.findAllByRole('option'))
  expect(options.length).toBe(2)
})

test.todo('clicking item updates value')
test.todo('down arrow moves selection down')
test.todo('up arrow moves selection up')
test.todo('return key selects item')
test.todo('escape key closes listbox')
test.todo('blur closes listbox')
