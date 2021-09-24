/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { useThemeUI } from 'theme-ui'
import { Styles, EditorProvider } from '../src'

afterEach(cleanup)

if ((global as any).document) {
  document.createRange = () =>
    ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    } as unknown as Range)
}

const theme = {
  styles: {
    root: {},
    h1: {},
  },
}

test('edits styles.root.fontFamily', async () => {
  let context
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Styles />
      <GetContext />
    </EditorProvider>
  )
  const input = await tree.findByLabelText('Font Family')
  fireEvent.change(input, {
    target: {
      value: 'system-ui',
    },
  })
  expect(context.theme.styles.root.fontFamily).toBe('system-ui')
})

test('renders without theme.styles', async () => {
  const tree = render(
    <EditorProvider theme={{}}>
      <Styles />
    </EditorProvider>
  )
  const input = await tree.findByLabelText('Font Weight')
  expect(input).toBeTruthy()
})
