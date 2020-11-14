/** @jsx jsx */
import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import mockConsole from 'jest-mock-console'
import packageInfo from '@emotion/react/package.json'
import { jsx, ThemeProvider, useColorMode, useThemeUI } from '../src/index'

const emotionVersion = packageInfo.version
const STORAGE_KEY = 'theme-ui-color-mode'

afterEach(cleanup)
beforeEach(() => {
  localStorage.removeItem(STORAGE_KEY)
})
expect.extend(matchers)

test('renders with color modes', () => {
  let json
  let mode
  const Mode = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <div>Mode</div>
  }
  renderer.act(() => {
    renderer.create(
      <ThemeProvider
        theme={{
          colors: {
            text: 'black',
            modes: {
              dark: {
                text: 'white',
              },
            },
          },
        }}>
        <Mode />
      </ThemeProvider>
    )
  })
  expect(mode).toBe('default')
})

test('renders with initial color mode name', () => {
  let json
  let mode
  const Mode = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <div>Mode</div>
  }
  renderer.act(() => {
    renderer.create(
      <ThemeProvider
        theme={{
          initialColorModeName: 'light',
          colors: {
            modes: {
              dark: {},
            },
          },
        }}>
        <Mode />
      </ThemeProvider>
    )
  })
  expect(mode).toBe('light')
})

test('useColorMode updates color mode state', () => {
  let mode
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return (
      <button
        onClick={(e) => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const tree = render(
    <ThemeProvider theme={{}}>
      <Button />
    </ThemeProvider>
  )
  const button = tree.getByText('test')
  fireEvent.click(button)
  expect(mode).toBe('dark')
})

test('color mode is passed through theme context', () => {
  let mode
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return (
      <button
        sx={{
          color: 'text',
        }}
        onClick={(e) => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const tree = render(
    <ThemeProvider
      theme={{
        useCustomProperties: false,
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

test('converts color modes to css custom properties', () => {
  const Box = (props) => (
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
    'var(--theme-ui-colors-text, #000)'
  )
})

test('uses default mode', () => {
  let mode
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  const tree = render(
    <ThemeProvider theme={{}}>
      <Button />
    </ThemeProvider>
  )
  expect(mode).toBe('default')
})

test('initializes mode based on localStorage', () => {
  window.localStorage.setItem(STORAGE_KEY, 'dark')
  let mode
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  const tree = render(
    <ThemeProvider theme={{}}>
      <Button />
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test('inherits color mode state from parent context', () => {
  let mode
  const Consumer = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        initialColorModeName: 'outer',
        colors: {
          modes: {
            dark: {},
          },
        },
      }}>
      <ThemeProvider
        theme={{
          initialColorModeName: 'inner',
        }}>
        <Consumer />
      </ThemeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('outer')
})

test('retains initial context', () => {
  let context
  const Consumer = (props) => {
    context = useThemeUI()
    return null
  }
  render(
    <ThemeProvider theme={{}}>
      <Consumer />
    </ThemeProvider>
  )
  expect(typeof context).toBe('object')
  expect(context.__EMOTION_VERSION__).toBe(emotionVersion)
})

test('initializes mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: true,
      media: query,
    }
  })
  let mode
  const Consumer = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        useColorSchemeMediaQuery: true,
      }}>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test('does not initialize mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
    }
  })
  let mode
  const Consumer = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        useColorSchemeMediaQuery: true,
      }}>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe('default')
})

test('does not initialize mode from prefers-color-scheme media query when useColorSchemeMediaQuery is not set', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: true,
      media: query,
    }
  })
  let mode
  const Consumer = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider theme={{}}>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe('default')
})

test('useColorMode throws when there is no theme context', () => {
  const restore = mockConsole()
  expect(() => {
    const Consumer = () => {
      const _ = useColorMode()
      return null
    }
    render(<Consumer />)
  }).toThrow()
  expect(console.error).toHaveBeenCalled()
  restore()
})

test('useThemeUI returns current color mode colors', () => {
  window.localStorage.setItem(STORAGE_KEY, 'tomato')
  let colors
  const GetColors = () => {
    const { theme } = useThemeUI()
    colors = theme.colors
    return null
  }
  const root = render(
    <ThemeProvider
      theme={{
        useCustomProperties: false,
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

test('warns when initialColorModeName matches a key in theme.colors.modes', () => {
  const restore = mockConsole()
  const root = render(
    <ThemeProvider
      theme={{
        initialColorModeName: 'dark',
        colors: {
          text: '#000',
          background: '#fff',
          modes: {
            dark: {
              text: '#fff',
              background: '#000',
            },
          },
        },
      }}
    />
  )
  expect(console.warn).toBeCalled()
  restore()
})

test('dot notation works with color modes', () => {
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    return (
      <button
        sx={{
          color: 'header.title',
        }}
        onClick={(e) => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const root = render(
    <ThemeProvider
      theme={{
        useCustomProperties: false,
        colors: {
          header: {
            title: 'blue',
          },
          modes: {
            dark: {
              header: {
                title: 'tomato',
              },
            },
          },
        },
      }}>
      <Button />
    </ThemeProvider>
  )
  const button = root.getByText('test')
  button.click()
  expect(button).toHaveStyleRule('color', 'tomato')
})

test('dot notation works with color modes and custom properties', () => {
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    return (
      <button
        sx={{
          color: 'header.title',
        }}
        onClick={(e) => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const root = render(
    <ThemeProvider
      theme={{
        colors: {
          header: {
            title: 'blue',
          },
          modes: {
            dark: {
              header: {
                title: 'tomato',
              },
            },
          },
        },
      }}>
      <Button />
    </ThemeProvider>
  )
  const button = root.getByText('test')
  button.click()
  expect(button).toHaveStyleRule(
    'color',
    'var(--theme-ui-colors-header-title, tomato)'
  )
})

test('raw color values are passed to theme-ui context when custom properties are enabled', () => {
  let color
  const Grabber = (props) => {
    const context = useThemeUI()
    color = context.theme.colors!.primary
    return null
  }
  const root = render(
    <ThemeProvider
      theme={{
        colors: {
          primary: 'tomato',
          modes: {
            dark: {
              primary: 'black',
            },
          },
        },
      }}>
      <Grabber />
    </ThemeProvider>
  )
  expect(color).toBe('tomato')
})

test('warns when localStorage is disabled', () => {
  Object.defineProperty(window, 'localStorage', {
    get: jest.fn(() => {
      throw 'SecurityError: The operation is insecure.'
    }),
  })

  let mode
  const Consumer = (props) => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }

  render(
    <ThemeProvider theme={{}}>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe('default')
})
