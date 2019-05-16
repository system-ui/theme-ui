/** @jsx jsx */
import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from 'react-testing-library'
import { matchers } from 'jest-emotion'
import {
  jsx,
  ColorModeProvider,
  ThemeProvider,
  useColorMode,
  useThemeUI,
} from '../src/index'

const STORAGE_KEY = 'theme-ui-color-mode'

afterEach(cleanup)
beforeEach(() => {
  localStorage.removeItem(STORAGE_KEY)
})
expect.extend(matchers)

test('renders with color modes', () => {
  let json
  let mode
  const Mode = props => {
    const [ colorMode ] = useColorMode()
    mode = colorMode
    return (
      <div>
        Mode
      </div>
    )
  }
  renderer.act(() => {
    renderer.create(
      <ColorModeProvider initialColorMode='light'>
        <ThemeProvider>
          <Mode />
        </ThemeProvider>
      </ColorModeProvider>
    )
  })
  expect(mode).toBe('light')
})

test('useColorMode updates color mode state', () => {
  let mode
  const Button = props => {
    const [ colorMode, setMode ] = useColorMode()
    mode = colorMode
    return (
      <button
        onClick={e => {
          setMode('dark')
        }}
        children='test'
      />
    )
  }
  const tree = render(
    <ColorModeProvider initialColorMode='light'>
      <ThemeProvider>
        <Button />
      </ThemeProvider>
    </ColorModeProvider>
  )
  const button = tree.getByText('test')
  fireEvent.click(button)
  expect(mode).toBe('dark')
})

test('color mode is passed through theme context', () => {
  let mode
  const Button = props => {
    const [ colorMode, setMode ] = useColorMode()
    mode = colorMode
    return (
      <button
        css={{
          color: 'text'
        }}
        onClick={e => {
          setMode('dark')
        }}
        children='test'
      />
    )
  }
  const tree = render(
    <ColorModeProvider initialColorMode='light'>
      <ThemeProvider
        theme={{
          colors: {
            text: '#000',
            modes: {
              dark: {
                text: 'cyan'
              }
            }
          }
        }}>
        <Button />
      </ThemeProvider>
    </ColorModeProvider>
  )
  const button = tree.getByText('test')
  button.click()
  expect(mode).toBe('dark')
  expect(tree.getByText('test')).toHaveStyleRule('color', 'cyan')
})

test('does not initialize mode', () => {
  let mode
  const Button = props => {
    const [ colorMode, setMode ] = useColorMode()
    mode = colorMode
    return (
      <button children='test' />
    )
  }
  const tree = render(
    <ColorModeProvider>
      <ThemeProvider>
        <Button />
      </ThemeProvider>
    </ColorModeProvider>
  )
  expect(mode).toBe(undefined)
})

test('initializes mode based on localStorage', () => {
  window.localStorage.setItem(STORAGE_KEY, 'dark')
  let mode
  const Button = props => {
    const [ colorMode, setMode ] = useColorMode()
    mode = colorMode
    return (
      <button children='test' />
    )
  }
  const tree = render(
    <ColorModeProvider>
      <ThemeProvider>
        <Button />
      </ThemeProvider>
    </ColorModeProvider>
  )
  expect(mode).toBe('dark')
})

test('inherits color mode state from parent context', () => {
  let mode
  const Consumer = props => {
    const [ colorMode ] = useColorMode()
    mode = colorMode
    return false
  }
  render(
    <ColorModeProvider initialColorMode='outer'>
      <ThemeProvider>
        <ColorModeProvider initialColorMode='inner'>
          <ThemeProvider>
            <Consumer />
          </ThemeProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </ColorModeProvider>
  )
  expect(mode).toBe('outer')
})

test('retains initial context', () => {
  let context
  const Consumer = props => {
    context = useThemeUI()
    return false
  }
  render(
    <ColorModeProvider>
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    </ColorModeProvider>
  )
  expect(typeof context.components).toBe('object')
  expect(context.components.h1).toBeTruthy()
  expect(context.components.pre).toBeTruthy()
  expect(context.components.blockquote).toBeTruthy()
})
