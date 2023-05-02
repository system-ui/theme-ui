/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderJSON } from '@theme-ui/test-utils'
import { ThemeUIProvider } from 'theme-ui'

import { Button } from '..'

import { theme } from './__test-utils__'

describe('Button', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Button />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('hidden', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Button hidden />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
