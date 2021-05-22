/** @jsx jsx */
import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import mockConsole, { RestoreConsole } from 'jest-mock-console'
import packageInfo from '@emotion/react/package.json'

import {
  ThemeUIContextValue,
  jsx,
  Theme,
  ThemeProvider,
  useColorMode,
  useThemeUI,
} from '../src'

const emotionVersion = packageInfo.version
const STORAGE_KEY = 'theme-ui-color-mode'

const defaultColorMode = undefined

expect.extend(matchers)

let restoreConsole: RestoreConsole
beforeEach(() => {
  restoreConsole = mockConsole()
  localStorage.removeItem(STORAGE_KEY)
})
afterEach(() => {
  cleanup()
  restoreConsole()
  window.matchMedia = undefined as any
})

test('renders with color modes', () => {
  let mode: string | undefined
  let rendered:
    | renderer.ReactTestRendererJSON
    | renderer.ReactTestRendererJSON[]
    | null = null

  const Mode = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <div>Mode</div>
  }
  renderer.act(() => {
    rendered = renderer
      .create(
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
      .toJSON()
  })
  expect(mode).toBe(defaultColorMode)
  expect(rendered).toBe(null)
})

test('renders with initial color mode name', () => {
  let mode: string | undefined
  const Mode = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <div>Mode</div>
  }
  renderer.act(() => {
    renderer.create(
      <ThemeProvider
        theme={{
          config: {
            initialColorModeName: 'light',
          },
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
  let mode: string | undefined
  const Button = () => {
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
  const Button = () => {
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
        config: {
          useCustomProperties: false,
        },
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
  const Box = () => (
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
    'var(--theme-ui-colors-text)'
  )
})

test('uses default mode', () => {
  let mode
  const Button = () => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  const tree = render(
    <ThemeProvider theme={{}}>
      <Button />
    </ThemeProvider>
  )
  expect(mode).toBe(defaultColorMode)
})

test('initializes mode based on localStorage', () => {
  window.localStorage.setItem(STORAGE_KEY, 'dark')
  let mode
  const Button = () => {
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
  const Consumer = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        config: {
          initialColorModeName: 'outer',
        },
        colors: {
          modes: {
            dark: {},
          },
        },
      }}>
      <ThemeProvider
        theme={{
          config: {
            initialColorModeName: 'inner',
          },
        }}>
        <Consumer />
      </ThemeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('outer')
})

test('retains initial context', () => {
  let context: ThemeUIContextValue | undefined
  const Consumer = () => {
    context = useThemeUI()
    return null
  }

  render(
    <ThemeProvider theme={{}}>
      <Consumer />
    </ThemeProvider>
  )
  expect(typeof context).toBe('object')
  expect(context!.__EMOTION_VERSION__).toBe(emotionVersion)
})

test('initializes mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: true,
      media: query,
    }
  })
  let mode
  const Consumer = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        config: {
          useColorSchemeMediaQuery: true,
        },
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
  const Consumer = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        config: {
          useColorSchemeMediaQuery: true,
        },
      }}>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe(defaultColorMode)
})

test('does not initialize mode from prefers-color-scheme media query when useColorSchemeMediaQuery is set to `false`', () => {
  window.localStorage.removeItem(STORAGE_KEY)
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: true,
      media: query,
    }
  })
  let mode
  const Consumer = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider
      theme={{
        config: {
          useColorSchemeMediaQuery: false,
        },
      }}>
      <Consumer />
    </ThemeProvider>
  )
  expect(mode).toBe(defaultColorMode)
})

test('useColorMode throws when there is no theme context', () => {
  expect(() => {
    const Consumer = () => {
      const _ = useColorMode()
      return null
    }
    render(<Consumer />)
  }).toThrow()
  expect(console.error).toHaveBeenCalled()
})

test('useThemeUI returns current color mode colors', () => {
  window.localStorage.setItem(STORAGE_KEY, 'tomato')
  let colors: Theme['colors']
  const GetColors = () => {
    const { theme } = useThemeUI()
    colors = theme.colors
    return null
  }
  const root = render(
    <ThemeProvider
      theme={{
        config: {
          useCustomProperties: false,
        },
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
  expect(colors!.text).toBe('black')
  expect(colors!.background).toBe('tomato')
})

test('warns when initialColorModeName matches a key in theme.colors.modes', () => {
  const root = render(
    <ThemeProvider
      theme={{
        config: {
          initialColorModeName: 'dark',
        },
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
})

test('dot notation works with color modes', () => {
  const Button = () => {
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
        config: {
          useCustomProperties: false,
        },
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
  const Button = () => {
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
  expect(button).toHaveStyleRule('color', 'var(--theme-ui-colors-header-title)')
})

test('raw color values are passed to theme-ui context when custom properties are enabled', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
    }
  })

  let color
  const Grabber = () => {
    const context = useThemeUI()
    color = context.theme.rawColors!.primary
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
  const restore = mockConsole()
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
    }
  })
  Object.defineProperty(window, 'localStorage', {
    get: jest.fn(() => {
      throw 'SecurityError: The operation is insecure.'
    }),
  })

  let mode
  const Consumer = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }

  render(
    <ThemeProvider theme={{}}>
      <Consumer />
    </ThemeProvider>
  )

  expect(mode).toBe(undefined)
  expect(console.warn).toHaveBeenCalled()
  restore()
})
