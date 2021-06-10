/** @jsx mdx */
import { mdx } from '@mdx-js/react'
import { matchers } from '@emotion/jest'
import mockConsole from 'jest-mock-console'
import { fireEvent, render, renderJSON } from '@theme-ui/test-utils'

import {
  ThemeProvider,
  jsx,
  BaseStyles,
  Theme,
  __ThemeUIContext,
  useThemeUI,
} from '../src/index'

expect.extend(matchers)

test('renders', () => {
  const json = renderJSON(
    <ThemeProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with styles', () => {
  const json = renderJSON(
    <ThemeProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato',
          },
        },
      }}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
})

test('creates non-standard components', () => {
  const json = renderJSON(
    <ThemeProvider
      components={{
        sup: 'sup',
      }}
      theme={{
        styles: {
          sup: {
            color: 'tomato',
          },
        },
      }}>
      <sup>hey</sup>
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('styles React components', () => {
  const Beep = (props: {}) => <h2 {...props} />
  const Inner = (props: {}) => mdx('Beep', props)

  const json = renderJSON(
    <ThemeProvider
      components={{
        Beep,
      }}
      theme={{
        styles: {
          Beep: {
            color: 'tomato',
          },
        },
      }}>
      <Inner />
    </ThemeProvider>
  )

  expect(json!.type).toBe('h2')
  expect(json).toHaveStyleRule('color', 'tomato')
})

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

test('warns when multiple versions of emotion are installed', () => {
  const restore = mockConsole()
  renderJSON(
    <__ThemeUIContext.Provider
      value={{
        __EMOTION_VERSION__: '9.0.0',
        theme: {},
      }}>
      <ThemeProvider theme={{}}>Conflicting versions</ThemeProvider>
    </__ThemeUIContext.Provider>
  )
  expect(console.warn).toBeCalled()
  restore()
})

test('functional themes receive outer theme', () => {
  const outer = {
    config: {
      useCustomProperties: false,
    },
    colors: {
      text: 'tomato',
      background: 'white',
      primary: 'black',
    },
  }
  const theme = jest.fn<Theme, [Theme]>((t) => ({
    ...t,
    colors: { text: t.colors?.primary },
  }))
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
  expect(json).toHaveStyleRule('color', 'black')
})

test('functional themes can be used at the top level', () => {
  let json
  expect(() => {
    json = renderJSON(
      jsx(
        ThemeProvider,
        {
          theme: (_): Theme => ({
            config: {
              useCustomProperties: false,
            },
            colors: {
              primary: 'tomato',
              background: 'white',
              text: 'black',
            },
          }),
        },
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

test('BaseStyles renders', () => {
  const json = renderJSON(
    <ThemeProvider
      theme={{
        fonts: {
          body: 'system-ui, sans-serif',
        },
        lineHeights: {
          body: 1.5,
        },
        fontWeights: {
          body: 400,
        },
      }}>
      <BaseStyles />
    </ThemeProvider>
  )
  expect(json).toMatchSnapshot()
})

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

test('nested ThemeProviders combine colors', async () => {
  const DarkModeButton = () => {
    const { setColorMode } = useThemeUI()

    return jsx(
      'button',
      {
        sx: { color: 'primary', bg: 'background' },
        onClick: () => setColorMode!('dark'),
      },
      'Dark Mode'
    )
  }

  const root = render(
    <ThemeProvider
      theme={{
        config: { useCustomProperties: true },
        colors: { primary: 'blue' },
      }}>
      <ThemeProvider
        theme={{
          colors: {
            background: 'white',
            modes: { dark: { background: 'black' } },
          },
        }}>
        <DarkModeButton />
      </ThemeProvider>
    </ThemeProvider>
  )

  let button = await root.findByRole('button')

  expect(button.parentElement).toMatchInlineSnapshot(`
    .emotion-0 {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: white;
      color: var(--theme-ui-colors-text);
      background-color: var(--theme-ui-colors-background);
    }

    .emotion-0.theme-ui-dark {
      --theme-ui-colors-background: black;
    }

    .emotion-0.theme-ui-__default {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: white;
    }

    .emotion-1 {
      color: var(--theme-ui-colors-primary);
      background-color: var(--theme-ui-colors-background);
    }

    <div
      class="theme-ui__nested-color-mode-provider emotion-0"
    >
      <button
        class="emotion-1"
      >
        Dark Mode
      </button>
    </div>
  `)

  fireEvent.click(button)

  expect(button.parentElement).toMatchInlineSnapshot(`
    .emotion-0 {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: black;
      color: var(--theme-ui-colors-text);
      background-color: var(--theme-ui-colors-background);
    }

    .emotion-0.theme-ui-dark {
      --theme-ui-colors-background: black;
    }

    .emotion-0.theme-ui-__default {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: black;
    }

    .emotion-1 {
      color: var(--theme-ui-colors-primary);
      background-color: var(--theme-ui-colors-background);
    }

    <div
      class="theme-ui__nested-color-mode-provider emotion-0"
    >
      <button
        class="emotion-1"
      >
        Dark Mode
      </button>
    </div>
  `)
})
