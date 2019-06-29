import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useThemeUI } from 'theme-ui'
import { wrapRootElement } from '../src/provider'
import theme from '../src/index'

afterEach(cleanup)
afterEach(() => {
  context = null
  delete theme.initialColorMode
  delete theme.colors
})

let context

const Consumer = props => {
  context = useThemeUI()
  return false
}

test('renders with theme context', () => {
  const root = render(wrapRootElement({ element: <Consumer /> }, {}))
  expect(context.theme).toEqual({})
})

test('renders with ColorMode component', () => {
  theme.initialColorMode = 'light'
  theme.colors = {
    primary: 'tomato',
  }
  const root = render(
    wrapRootElement(
      {
        element: <Consumer />,
      },
      {}
    )
  )
  expect(context.theme).toEqual({
    initialColorMode: 'light',
    colors: {
      primary: 'tomato',
    },
  })
})
