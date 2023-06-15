/**
 * @jest-environment jsdom
 */

import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from '@theme-ui/test-utils'
import { matchers } from '@emotion/jest'
import mockConsole, { RestoreConsole } from 'jest-mock-console'
import packageInfo from '@emotion/react/package.json'

import {
  ThemeUIContextValue,
  Theme,
  ThemeUIProvider,
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
        <ThemeUIProvider
          theme={{
            colors: {
              text: 'black',
              modes: {
                dark: {
                  text: 'white',
                },
              },
            },
          }}
        >
          <Mode />
        </ThemeUIProvider>
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
      <ThemeUIProvider
        theme={{
          config: {
            initialColorModeName: 'light',
          },
          colors: {
            modes: {
              dark: {},
            },
          },
        }}
      >
        <Mode />
      </ThemeUIProvider>
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
        onClick={(_e) => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const tree = render(
    <ThemeUIProvider theme={{}}>
      <Button />
    </ThemeUIProvider>
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
        onClick={() => setMode('dark')}
        children="test"
      />
    )
  }
  const tree = render(
    <ThemeUIProvider
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
      }}
    >
      <Button />
    </ThemeUIProvider>
  )
  const button = tree.getByText('test')
  act(() => button.click())
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
    <ThemeUIProvider
      theme={{
        colors: {
          text: '#000',
          modes: {
            dark: {
              text: '#fff',
            },
          },
        },
      }}
    >
      <Box />
    </ThemeUIProvider>
  )
  expect(tree.getByText('test')).toHaveStyleRule(
    'color',
    'var(--theme-ui-colors-text)'
  )
})

test('uses default mode', () => {
  let mode
  const Button = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  render(
    <ThemeUIProvider theme={{}}>
      <Button />
    </ThemeUIProvider>
  )
  expect(mode).toBe(defaultColorMode)
})

test('initializes mode based on localStorage', () => {
  window.localStorage.setItem(STORAGE_KEY, 'dark')
  let mode
  const Button = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  render(
    <ThemeUIProvider theme={{}}>
      <Button />
    </ThemeUIProvider>
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
    <ThemeUIProvider
      theme={{
        config: {
          initialColorModeName: 'outer',
        },
        colors: {
          modes: {
            dark: {},
          },
        },
      }}
    >
      <ThemeUIProvider
        theme={{
          config: {
            initialColorModeName: 'inner',
          },
        }}
      >
        <Consumer />
      </ThemeUIProvider>
    </ThemeUIProvider>
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
    <ThemeUIProvider theme={{}}>
      <Consumer />
    </ThemeUIProvider>
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
    <ThemeUIProvider
      theme={{
        config: {
          useColorSchemeMediaQuery: true,
        },
      }}
    >
      <Consumer />
    </ThemeUIProvider>
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
    <ThemeUIProvider
      theme={{
        config: {
          useColorSchemeMediaQuery: true,
        },
      }}
    >
      <Consumer />
    </ThemeUIProvider>
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
    <ThemeUIProvider
      theme={{
        config: {
          useColorSchemeMediaQuery: false,
        },
      }}
    >
      <Consumer />
    </ThemeUIProvider>
  )
  expect(mode).toBe(defaultColorMode)
})

test('useColorMode throws when there is no theme context', () => {
  expect(() => {
    const Consumer = () => {
      useColorMode()
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
  render(
    <ThemeUIProvider
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
      }}
    >
      <GetColors />
    </ThemeUIProvider>
  )
  expect(colors!.text).toBe('black')
  expect(colors!.background).toBe('tomato')
})

test('warns when initialColorModeName matches a key in theme.colors.modes', () => {
  render(
    <ThemeUIProvider
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
    const [, setMode] = useColorMode()
    return (
      <button
        sx={{
          color: 'header.title',
        }}
        onClick={() => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const root = render(
    <ThemeUIProvider
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
      }}
    >
      <Button />
    </ThemeUIProvider>
  )
  const button = root.getByText('test')
  act(() => button.click())
  expect(button).toHaveStyleRule('color', 'tomato')
})

test('dot notation works with color modes and custom properties', () => {
  const Button = () => {
    const [, setMode] = useColorMode()
    return (
      <button
        sx={{
          color: 'header.title',
        }}
        onClick={() => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const root = render(
    <ThemeUIProvider
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
      }}
    >
      <Button />
    </ThemeUIProvider>
  )
  const button = root.getByText('test')
  act(() => button.click())
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
  render(
    <ThemeUIProvider
      theme={{
        colors: {
          primary: 'tomato',
          modes: {
            dark: {
              primary: 'black',
            },
          },
        },
      }}
    >
      <Grabber />
    </ThemeUIProvider>
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
    <ThemeUIProvider theme={{}}>
      <Consumer />
    </ThemeUIProvider>
  )

  expect(mode).toBe(undefined)
  expect(console.warn).toHaveBeenCalled()
  restore()
})
