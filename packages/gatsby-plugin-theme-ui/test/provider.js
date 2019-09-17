import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useThemeUI } from 'theme-ui'
import { wrapRootElement } from '../src/provider'
import theme from '../src/index'
import renderer from 'react-test-renderer'

let context

afterEach(() => {
  cleanup()
  context = null
  delete theme.initialColorMode
  delete theme.colors
})

const Consumer = props => {
  context = useThemeUI()
  return false
}

test('renders with theme context', () => {
  const root = render(wrapRootElement({ element: <Consumer /> }, {}))
  expect(context.theme).toEqual({
    colors: {},
  })
})

test('renders with ColorMode component', () => {
  theme.colors = {
    primary: 'tomato',
    modes: {
      dark: {
        primary: 'magenta',
      }
    }
  }
  const root = renderer.create(
    wrapRootElement(
      {
        element: <Consumer />,
      },
      {}
    )
  )
  expect(context.theme.colors.primary).toEqual('tomato')
  const tree = root.toTree()
  const { children } = tree.props.children.props
  expect(children[0].key).toEqual('theme-ui-color-mode')
})
