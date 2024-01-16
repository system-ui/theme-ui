/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderJSON } from '@theme-ui/test-utils'
import { ThemeUIProvider } from 'theme-ui'

import { Field } from '..'

import { theme } from './__test-utils__'

describe('Field', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Field />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('renders with id prop', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Field id="test-field" />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('containerSx and sx', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Field label="Name" sx={{ color: 'primary' }} containerSx={{ my: 4 }} />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
