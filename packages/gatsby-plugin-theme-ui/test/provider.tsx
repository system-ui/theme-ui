import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useThemeUI, ContextValue } from 'theme-ui'
import renderer from 'react-test-renderer'

import { wrapRootElement } from '../src/provider'
import theme from '../src/index'

let context: ContextValue | null = null

afterEach(() => {
  cleanup()
  context = null
  delete theme.initialColorModeName
  delete theme.colors
})

const Consumer: React.FC = () => {
  context = useThemeUI()
  return null
}

test('renders with theme context', () => {
  const _root = render(wrapRootElement({ element: <Consumer /> }))
  expect(context!.theme).toEqual({
    colors: {},
  })
})

test.skip('renders with ColorMode component', () => {
  theme.colors = {
    primary: 'tomato',
    background: 'white',
    text: 'black',
    modes: {
      dark: {
        primary: 'magenta',
        background: 'black',
        text: 'white',
      },
    },
  }
  const root = renderer.create(
    wrapRootElement(
      {
        element: <Consumer />,
      },
      {}
    )
  )
  expect(context!.theme!.colors?.primary).toEqual('tomato')
  const tree = root.toTree()
  const { children } = tree?.props.children.props
  expect(children[0].key).toEqual('theme-ui-color-mode')
})
