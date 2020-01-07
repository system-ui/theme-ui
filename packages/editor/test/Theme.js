import React from 'react'
import renderer from 'react-test-renderer'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import { ThemeProvider, useThemeUI } from 'theme-ui'
import { EditorProvider, Theme } from '../src'

afterEach(cleanup)

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  })
}

const theme = {
  colors: {
    text: '#fff',
    background: '#000',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  space: [0, 4, 8, 16, 32],
}

test.todo('add Theme tests')

test('edits colors', async () => {
  let context
  const GetContext = props => {
    context = useThemeUI()
    return false
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.Colors />
      <GetContext />
    </EditorProvider>
  )
  const swatch = tree.getByText('text')
  fireEvent.click(swatch)
  const [ input ] = await waitForElement(() => tree.getAllByPlaceholderText('hex'))
  expect(swatch)
  fireEvent.change(input, {
    target: {
      value: '#ff0000'
    }
  })
  expect(context.theme.colors.text).toBe('#ff0000')
})
