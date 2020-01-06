import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeContext } from '@emotion/core'
import {
  Editor,
  useEditor,
} from '../src'

test('provides context', () => {
  let context
  const GetContext = () => {
    context = useEditor()
    return false
  }
  const json = renderer.create(
    <Editor
      context={{
        beep: 'boop',
      }}>
      <GetContext />
    </Editor>
  ).toJSON()
  expect(context.beep).toBe('boop')
})

test('sets a fixed theme', () => {
  let theme
  const GetTheme = () => {
    theme = React.useContext(ThemeContext)
    return false
  }
  const json = renderer.create(
    <Editor>
      <GetTheme />
    </Editor>
  )
  expect(theme.colors.primary)
  expect(theme.colors.highlight)
})
