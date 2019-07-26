/** @jsx jsx */
import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import {
  jsx,
  ThemeProvider,
  useColorMode,
  useThemeUI,
  ColorMode,
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
    const [colorMode] = useColorMode()
    mode = colorMode
    return <div>Mode</div>
  }
  renderer.act(() => {
    renderer.create(
      <ThemeProvider
        theme={{
          initialColorMode: 'light',
        }}>
        <Mode />
      </ThemeProvider>
    )
  })
  expect(mode).toBe('light')
})

test('useColorMode updates color mode state', () => {
  let mode
  const Button = props => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return (
      <button
        onClick={e => {
          setMode('dark')
        }}
        children="test"
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
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return (
      <button
        sx={{
          color: 'text',
        }}
        onClick={e => {
          setMode('dark')
        }}
        children="test"
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
              text: 'cyan',
            },
          },
        },
      }}>
      <Button />
    </ThemeProvider>
  )
  const button = tree.getByText('test')
  button.click()
  expect(mode).toBe('dark')
  expect(tree.getByText('test')).toHaveStyleRule('color', 'cyan')
})

test('converts color modes to css properties', () => {
  const Box = props => (
    <div
      sx={{
        color: 'text',
      }}
      children="test"
    />
  )
  const tree = render(
    <ThemeProvider
      theme={{
        useCustomProperties: true,
        colors: {
          text: '#000',
          modes: {
            dark: {
              text: '#fff',
            },
          },
        },
      }}>
      <Box />
    </ThemeProvider>
  )
  expect(tree.getByText('test')).toHaveStyleRule(
    'color',
    'var(--theme-ui-text,#000)'
  )
})

test('does not initialize mode', () => {
  let mode
  const Button = props => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
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
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  const tree = render(
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test('inherits color mode state from parent context', () => {
  let mode
  const Consumer = props => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return false
  }
  render(
    <ThemeProvider
      theme={{
        initialColorMode: 'outer',
      }}>
      <ThemeProvider
        theme={{
          initialColorMode: 'inner',
        }}>
        <Consumer />
      </ThemeProvider>
    </ThemeProvider>
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
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  )
  expect(typeof context.components).toBe('object')
  expect(context.components.h1).toBeTruthy()
  expect(context.components.pre).toBeTruthy()
  expect(context.components.blockquote).toBeTruthy()
})

test('initializes mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: true,
      media: query,
    }
  })
  let mode
  const Consumer = props => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return false
  }
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test('does not initialize mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
    }
  })
  let mode
  const Consumer = props => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return false
  }
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe(undefined)
})

test('ColorMode component renders null', () => {
  const json = renderer
    .create(
      <ThemeProvider>
        <ColorMode />
      </ThemeProvider>
    )
    .toJSON()
  expect(json).toBe(null)
})

test('ColorMode component renders with colors', () => {
  const root = render(
    <ThemeProvider
      theme={{
        colors: {
          text: 'tomato',
          background: 'black',
          modes: {
            tomato: {
              text: 'black',
              background: 'tomato',
            },
          },
        },
      }}>
      <ColorMode />
    </ThemeProvider>
  )
  const styles = document.querySelector('style').innerHTML
  expect(styles).toMatchSnapshot()
})

test('useColorMode throws when there is no theme context', () => {
  expect(() => {
    const Consumer = props => {
      const [colorMode] = useColorMode('beep')
      mode = colorMode
      return false
    }
    render(<Consumer />)
  }).toThrow()
})

test('useThemeUI returns current color mode colors', () => {
  window.localStorage.setItem(STORAGE_KEY, 'tomato')
  let colors
  const GetColors = () => {
    const { theme } = useThemeUI()
    colors = theme.colors
    return false
  }
  const root = render(
    <ThemeProvider
      theme={{
        initialColorMode: 'light',
        colors: {
          text: 'tomato',
          background: 'black',
          modes: {
            tomato: {
              text: 'black',
              background: 'tomato',
            },
          },
        },
      }}>
      <GetColors />
    </ThemeProvider>
  )
  expect(colors.text).toBe('black')
  expect(colors.background).toBe('tomato')
})
