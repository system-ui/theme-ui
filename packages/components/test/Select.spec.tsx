/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from '@theme-ui/core'
import { renderJSON } from '@theme-ui/test-utils'
import React from 'react'

import { Select, SelectProps } from '../src'

import { theme } from './__test-utils__'

describe('Select', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Select />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with sx prop', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Select sx={{ ml: 3 }} value="hello" />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with custom icon', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Select
          arrow={
            <svg>
              <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
            </svg>
          }
        />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with background-color', () => {
    const json = renderJSON(
      <ThemeProvider theme={{ colors: { background: 'blueviolet' } }}>
        <Select />
      </ThemeProvider>
    )!

    expect(json.children?.[0]).toHaveStyleRule('background-color', 'blueviolet')
  })
})
