/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderJSON } from '@theme-ui/test-utils'
import { ThemeProvider } from 'theme-ui'

import { Button } from '..'

import { theme } from './__test-utils__'

describe('Button', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('hidden', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Button hidden />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
