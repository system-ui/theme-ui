/** @jsx jsx */
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import mockConsole from 'jest-mock-console'
import { jsx, ThemeProvider, useThemeUI } from '@theme-ui/core'
import { ColorModeProvider, useColorMode, InitializeColorMode } from '../src'
import { Theme } from '@theme-ui/css'
import { renderJSON } from '@theme-ui/test-utils'

const STORAGE_KEY = 'theme-ui-color-mode'

afterEach(cleanup)
beforeEach(() => {
  localStorage.removeItem(STORAGE_KEY)
})
expect.extend(matchers)


test('renders with color modes', () => {
  let mode
  const Mode = () => {
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
        <ColorModeProvider>
          <Mode />
        </ColorModeProvider>
      </ThemeProvider>
    )
  })
  expect(mode).toBe('default')
})

test('renders with initial color mode name', () => {
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
        <ColorModeProvider>
          <Mode />
        </ColorModeProvider>
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
        onClick={() => {
          setMode('dark')
        }}
        children="test"
      />
    )
  }
  const tree = render(
    <ThemeProvider theme={{}}>
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
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
        onClick={() => {
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
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
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
      <ColorModeProvider>
        <Box />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(tree.getByText('test')).toHaveStyleRule(
    'color',
    'var(--theme-ui-colors-text,#000)'
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
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
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
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test('does not initialize mode based on localStorage if useLocalStorage is set to false', () => {
  window.localStorage.setItem(STORAGE_KEY, 'dark')
  let mode
  const Button = (props) => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  const tree = render(
    <ThemeProvider
      theme={{
        useLocalStorage: false,
      }}>
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('default')
})

test('retains initial context', () => {
  let context
  const Consumer = () => {
    context = useThemeUI()
    return null
  }
  render(
    <ThemeProvider theme={{}}>
      <ColorModeProvider>
        <Consumer />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(typeof context).toBe('object')
  expect(typeof context.theme).toBe('object')
  expect(typeof context.setColorMode).toBe('function')
})

test('initializes mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query.includes('dark'),
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
        useColorSchemeMediaQuery: true,
      }}>
      <ColorModeProvider>
        <Consumer />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('dark')
})

test('initializes light mode from prefers-color-scheme media query', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query.includes('light'),
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
        useColorSchemeMediaQuery: true,
      }}>
      <ColorModeProvider>
        <Consumer />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('light')
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
        useColorSchemeMediaQuery: true,
      }}>
      <ColorModeProvider>
        <Consumer />
      </ColorModeProvider>
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
  const Consumer = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return null
  }
  render(
    <ThemeProvider theme={{}}>
      <ColorModeProvider>
        <Consumer />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('default')
})

test('ColorModeProvider renders with global colors', () => {
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
      <ColorModeProvider>
        <h1>Hello</h1>
      </ColorModeProvider>
    </ThemeProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.color).toBe('tomato')
  expect(style.backgroundColor).toBe('black')
})

test('useColorMode throws when there is no theme context', () => {
  const restore = mockConsole()
  expect(() => {
    const Consumer = () => {
      /** @ts-ignore */
      const [colorMode] = useColorMode('beep')
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
        // minor functional change
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
      <ColorModeProvider>
        <GetColors />
      </ColorModeProvider>
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
      }}>
      <ColorModeProvider />
    </ThemeProvider>
  )
  expect(console.warn).toBeCalled()
  restore()
})

test('does not warn in production', () => {
  const restore = mockConsole()
  const init = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
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
      }}>
      <ColorModeProvider />
    </ThemeProvider>
  )
  expect(console.warn).not.toBeCalled()
  restore()
  process.env.NODE_ENV = init
})

test('dot notation works with color modes', () => {
  const Button = () => {
    const [colorMode, setMode] = useColorMode()
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
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
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
        onClick={() => {
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
      <ColorModeProvider>
        <Button />
      </ColorModeProvider>
    </ThemeProvider>
  )
  const button = root.getByText('test')
  button.click()
  expect(button).toHaveStyleRule(
    'color',
    'var(--theme-ui-colors-header-title,tomato)'
  )
})

test('raw color values are passed to theme-ui context when custom properties are enabled', () => {
  let color
  const Grabber = () => {
    const context = useThemeUI()
    color = context.theme?.colors?.primary
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
      <ColorModeProvider>
        <Grabber />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(color).toBe('tomato')
})

test('InitializeColorMode renders', () => {
  const json = renderJSON(<InitializeColorMode />)
  expect(json).toMatchSnapshot()
})

test('colorMode accepts function from previous state to new one', () => {
  type MyColorMode = 'serious' | 'cute' | 'hackerman'

  const theme: Theme = {
    initialColorModeName: 'serious',
    colors: {
      primary: 'black',
      modes: {
        cute: {
          primary: 'pink',
        },
        hackerman: {
          primary: 'chartreuse',
        },
      },
    },
  }

  let primaryColor
  const Grabber = () => {
    const context = useThemeUI()
    primaryColor = context.theme?.colors?.primary
    return null
  }

  const colorModes: MyColorMode[] = ['serious', 'cute', 'hackerman']
  const NextColorModeButton = () => {
    // user can specify their color mode name type
    const [, setColorMode] = useColorMode<MyColorMode>()

    return (
      <button
        onClick={() => {
          setColorMode((previous) => {
            return colorModes[
              (colorModes.indexOf(previous) + 1) % colorModes.length
            ]
          })
        }}>
        next color mode
      </button>
    )
  }

  const root = render(
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Grabber />
        <NextColorModeButton />
      </ColorModeProvider>
    </ThemeProvider>
  )

  expect(primaryColor).toBe('black')

  act(() => {
    root.getByText('next color mode').click()
  })

  expect(primaryColor).toBe('pink')

  act(() => {
    root.getByText('next color mode').click()
  })

  expect(primaryColor).toBe('chartreuse')
})

test('warns when localStorage is disabled', () => {
  const localStorage = window.localStorage
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
      <ColorModeProvider>
        <Consumer />
      </ColorModeProvider>
    </ThemeProvider>
  )
  expect(mode).toBe('default')

  Object.defineProperty(window, 'localStorage', { value: localStorage })
})
