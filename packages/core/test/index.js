import React from 'react'
import { mdx } from '@mdx-js/react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import mockConsole from 'jest-mock-console'
import {
  jsx,
  Context,
  useThemeUI,
  merge,
  ThemeProvider,
} from '../src'

afterEach(cleanup)

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

describe('ThemeProvider', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider>
        <h1>Hello</h1>
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('warns when multiple versions of emotion are installed', () => {
    const restore = mockConsole()
    const json = renderJSON(
      <Context.Provider
        value={{
          emotionVersion: '9.0.0',
        }}>
        <ThemeProvider>Conflicting versions</ThemeProvider>
      </Context.Provider>
    )
    expect(console.warn).toBeCalled()
    restore()
  })

  test('functional themes receive outer theme', () => {
    const outer = {
      colors: {
        text: 'tomato',
      },
    }
    const theme = jest.fn()
    const json = renderJSON(
      jsx(
        ThemeProvider,
        { theme: outer },
        jsx(
          ThemeProvider,
          { theme },
          jsx('div', {
            sx: {
              color: 'text',
            },
          })
        )
      )
    )
    expect(theme).toHaveBeenCalledWith(outer)
    expect(json).toHaveStyleRule('color', 'text')
  })

  test('functional themes can be used at the top level', () => {
    const theme = jest.fn(() => ({
      useCustomProperties: false,
      colors: {
        primary: 'tomato',
      },
    }))
    let json
    expect(() => {
      json = renderJSON(
        jsx(
          ThemeProvider,
          { theme },
          jsx(
            'div',
            {
              sx: {
                color: 'primary',
              },
            },
            'hi'
          )
        )
      )
    }).not.toThrow()
    expect(json).toHaveStyleRule('color', 'tomato')
  })

  test('variants support functional values', () => {
    const theme = {
      colors: {
        primary: 'tomato',
      },
      cards: {
        default: {
          border: t => `1px solid ${t.colors.primary}`,
        }
      }
    }
    const json = renderJSON(
      jsx(ThemeProvider, { theme },
        jsx('div', {
          sx: {
            variant: 'cards.default',
          }
        })
      )
    )
    expect(json).toHaveStyleRule('border', '1px solid tomato')

  })
})

describe('jsx', () => {
  test('custom pragma adds styles', () => {
    const json = renderJSON(
      jsx('div', {
        sx: {
          mx: 'auto',
          p: 2,
          bg: 'tomato',
        },
      })
    )
    expect(json).toHaveStyleRule('margin-left', 'auto')
    expect(json).toHaveStyleRule('margin-right', 'auto')
    expect(json).toHaveStyleRule('padding', '8px')
    expect(json).toHaveStyleRule('background-color', 'tomato')
  })

  test('adds raw values with css prop', () => {
    const json = renderJSON(
      jsx('div', {
        css: {
          margin: 4,
        },
      })
    )
    expect(json).toHaveStyleRule('margin', '4px')
  })

  test('css prop accepts functions', () => {
    const json = renderJSON(
      jsx(ThemeProvider, {
        theme: {
          colors: {
            primary: 'tomato',
          }
        }
      },
        jsx('div', {
          css: t => ({
            color: t.colors.primary,
          }),
        })
      )
    )
    expect(json).toHaveStyleRule('color', 'tomato')
  })

  test('sx and css prop can be used together', () => {
    const json = renderJSON(
      jsx('div', {
        css: {
          margin: 0,
        },
        sx: {
          bg: 'tomato',
        },
      })
    )
    expect(json).toHaveStyleRule('background-color', 'tomato')
    expect(json).toHaveStyleRule('margin', '0')
  })

  test('custom pragma handles null props', () => {
    const json = renderJSON(jsx('h1', null, 'hello'))
    expect(json).toMatchSnapshot()
  })

  test('sx prop supports dot notation', () => {
    const json = renderJSON(
      jsx(
        ThemeProvider,
        {
          theme: {
            useCustomProperties: false,
            colors: {
              text: 'black',
              base: {
                blue: ['#07c'],
                primary: 'cyan',
              },
            },
          },
        },
        jsx('div', {
          sx: {
            color: 'base.blue.0',
            backgroundColor: 'base.primary',
          },
        })
      )
    )
    expect(json).toHaveStyleRule('background-color', 'cyan')
    expect(json).toHaveStyleRule('color', '#07c')
  })

  test('does not add css prop when not provided', () => {
    jest.spyOn(global.console, 'warn')
    const json = renderJSON(jsx(React.Fragment, null, 'hi'))
    expect(json.props).toEqual(undefined)
    expect(console.warn).not.toBeCalled()
  })
})

describe('merge', () => {
  test('deeply merges objects', () => {
    const result = merge(
      {
        beep: 'boop',
        hello: {
          hi: 'howdy',
        },
      },
      {
        bleep: 'bloop',
        hello: {
          ohaiyo: 'osu',
        },
      }
    )
    expect(result).toEqual({
      beep: 'boop',
      bleep: 'bloop',
      hello: {
        hi: 'howdy',
        ohaiyo: 'osu',
      },
    })
  })

  test('merges multiple objects', () => {
    const result = merge.all(
      {
        beep: 'boop',
      },
      {
        bleep: 'bloop',
      },
      {
        plip: 'plop',
      }
    )
    expect(result).toEqual({
      beep: 'boop',
      bleep: 'bloop',
      plip: 'plop',
    })
  })

  test('does not attempt to merge React components', () => {
    const h1 = React.forwardRef((props, ref) => <h1 ref={ref} {...props} />)
    const result = merge(
      {
        h1: props => <h1 {...props} />,
      },
      {
        h1,
      }
    )
    expect(result).toEqual({ h1 })
  })

  test('primitive types override arrays', () => {
    const result = merge(
      {
        fontSize: [3, 4, 5],
      },
      {
        fontSize: 4,
      }
    )
    expect(result).toEqual({
      fontSize: 4,
    })
  })

  test('arrays override arrays', () => {
    const result = merge(
      {
        fontSize: [3, 4, 5],
      },
      {
        fontSize: [6, 7],
      }
    )
    expect(result).toEqual({
      fontSize: [6, 7],
    })
  })

  test('arrays override primitive types', () => {
    const result = merge(
      {
        fontSize: 5,
      },
      {
        fontSize: [6, 7],
      }
    )
    expect(result).toEqual({
      fontSize: [6, 7],
    })
  })
})

// describe('Context', () => {})
describe('useThemeUI', () => {
  test('returns theme context', () => {
    let context
    const GetContext = props => {
      context = useThemeUI()
      return false
    }
    renderJSON(
      <ThemeProvider
        theme={{
          colors: {
            text: 'tomato',
          }
        }}>
        <GetContext />
      </ThemeProvider>
    )
    expect(context).toBeTruthy()
    expect(context.theme.colors.text).toBe('tomato')
  })
})

