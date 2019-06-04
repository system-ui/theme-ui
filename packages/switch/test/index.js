import React from 'react'
import renderer from 'react-test-renderer'
import { Switch } from '../src'

const renderJSON = el => renderer.create(el).toJSON()

test('renders', () => {
  const json = renderJSON(
    <Switch />
  )
  expect(json).toMatchSnapshot()
})

test('renders checked', () => {
  const json = renderJSON(
    <Switch checked />
  )
  expect(json).toMatchSnapshot()
})

test('renders with icons', () => {
  const json = renderJSON(
    <Switch
      icons={{
        checked: 'on',
        unchecked: 'off',
      }}
    />
  )
  expect(json).toMatchSnapshot()
})
