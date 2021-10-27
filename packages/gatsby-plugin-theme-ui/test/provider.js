/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useThemeUI } from 'theme-ui'
import { WrapRootElement } from '../src/provider'
import theme from '../src/index'
import renderer from 'react-test-renderer'

let context

afterEach(() => {
  cleanup()
  context = null
  delete theme.config?.initialColorMode
  delete theme.colors
})

const Consumer = (props) => {
  context = useThemeUI()
  return false
}

test('renders with theme context', () => {
  const root = render(WrapRootElement({ element: <Consumer /> }, {}))
  expect(context.theme).toEqual({
    colors: {},
    rawColors: {},
    styles: {
      pre: {},
    },
  })
})

test.skip('renders with ColorMode component', () => {
  theme.colors = {
    primary: 'tomato',
    modes: {
      dark: {
        primary: 'magenta',
      },
    },
  }
  const root = renderer.create(
    WrapRootElement(
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
