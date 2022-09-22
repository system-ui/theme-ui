/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderJSON } from '@theme-ui/test-utils'
import { ThemeProvider } from 'theme-ui'

import { Field } from '..'

import { theme } from './__test-utils__'

describe('Field', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Field />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('renders with id prop', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Field id="test-field" />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('containerSx and sx', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Field label="Name" sx={{ color: 'primary' }} containerSx={{ my: 4 }} />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
