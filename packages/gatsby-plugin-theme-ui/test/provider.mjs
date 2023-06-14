// @ts-check
// import React from 'react'
// import { render, cleanup } from '@theme-ui/test-utils'
import { useThemeUI } from 'theme-ui'
// import { WrapRootElement } from '../src/provider'
// import { jest } from '@jest/globals'
// import _theme from '../src'

// jest.unstable_mockModule('gatsby', () => ({
//   graphql: jest.fn(),
//   useStaticQuery: jest.fn(() => ({
//     themeUiConfig: {
//       preset: {},
//       prismPreset: {},
//     },
//   })),
// }))

/** @type {import("theme-ui").Theme} */
const theme = {}

let context

afterEach(async () => {
  const { cleanup } = await import('@theme-ui/test-utils')

  cleanup()
  context = null
  delete theme.colors
  delete theme.config
})

const Consumer = () => {
  context = useThemeUI()
  return null
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
