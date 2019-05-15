/** @jsx jsx */
import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from 'react-testing-library'
import { matchers } from 'jest-emotion'
import {
  jsx,
  ThemeProvider,
  useColorMode,
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
    const [ colorMode ] = useColorMode('light')
    mode = colorMode
    return (
      <div>
        Mode
      </div>
    )
  }
  renderer.act(() => {
    renderer.create(
      <ThemeProvider>
        <Mode />
      </ThemeProvider>
    )
  })
  expect(mode).toBe('light')
})

test('useColorMode updates color mode state', () => {
  let mode
  const Button = props => {
    const [ colorMode, setMode ] = useColorMode('light')
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
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  )
  const button = tree.getByText('test')
  fireEvent.click(button)
  expect(mode).toBe('dark')
})

test('color mode is passed through theme context', () => {
  let mode
  const Button = props => {
    const [ colorMode, setMode ] = useColorMode('light')
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
    <ThemeProvider>
      <Button />
    </ThemeProvider>
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
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test.todo('inherits color mode state from parent context')
