/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, cleanup } from '@theme-ui/test-utils'
import { useThemeUI } from 'theme-ui'
import { WrapRootElement } from '../src/provider'
import _theme from '../src/index'

/** @type {import("theme-ui").Theme} */
const theme = _theme

let context

afterEach(() => {
  cleanup()
  context = null
  delete theme.colors
  delete theme.config
})

const Consumer = () => {
  context = useThemeUI()
  return false
}

test('renders with theme context', () => {
  theme.config = { useCustomProperties: false }
  theme.colors = {
    primary: 'tomato',
    modes: {
      dark: {
        primary: 'magenta',
      },
    },
  }
  render(WrapRootElement({ element: <Consumer /> }, {}))
  expect(context.theme).toEqual({
    config: { useCustomProperties: false },
    colors: {
      primary: 'tomato',
      modes: {
        dark: { primary: 'magenta' },
      },
    },
    styles: {
      pre: {},
    },
  })
})
