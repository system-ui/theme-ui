/**
 * @jest-environment jsdom
 */

import React from 'react'
import { matchers } from '@emotion/jest'
import mockConsole from 'jest-mock-console'
import { fireEvent, render, renderJSON } from '@theme-ui/test-utils'

import {
  ThemeProvider as DeprecatedThemeProvider,
  ThemeUIProvider,
  jsx,
  BaseStyles,
  Theme,
  __ThemeUIContext,
  useThemeUI,
} from '../src/index'

expect.extend(matchers)

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
      }}
    >
      <ThemeUIProvider theme={{}}>Conflicting versions</ThemeUIProvider>
    </__ThemeUIContext.Provider>
  )
  expect(console.warn).toBeCalled()
  restore()
})

test('warns deprecated ThemeUIProvider', () => {
  const restore = mockConsole()
  render(
    <DeprecatedThemeProvider theme={{}}>
      <div />
    </DeprecatedThemeProvider>
  )
  expect(console.warn).toHaveBeenCalled()
  restore()
})

test('functional themes receive outer theme', () => {
  const outer: Theme = {
    config: {
      useCustomProperties: false,
    },
    colors: {
      text: 'tomato',
      background: 'white',
      primary: 'rgb(12, 34, 56)',
    },
  }
  const theme = jest.fn<Theme, [Theme]>((t) => ({
    ...t,
    colors: { text: t.colors?.primary },
  }))

  const tree = render(
    jsx(
      ThemeUIProvider,
      { theme: outer },
      jsx(
        ThemeUIProvider,
        { theme },
        jsx('article', {
          sx: {
            color: 'text',
            textDecoration: 'underline',
          },
        })
      )
    )
  )
  expect(theme).toHaveBeenCalledWith(outer)

  const article = tree.baseElement.querySelector('article')!

  expect(window.getComputedStyle(article).color).toBe('rgb(12, 34, 56)')
})

test('functional themes can be used at the top level', () => {
  let json
  expect(() => {
    json = renderJSON(
      jsx(
        ThemeUIProvider,
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
    <ThemeUIProvider
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
      }}
    >
      <BaseStyles />
    </ThemeUIProvider>
  )
  expect(json).toMatchSnapshot()
})

test('BaseStyles renders sx prop styles', () => {
  const json = renderJSON(
    <ThemeUIProvider
      theme={{
        colors: {
          custom: 'tomato',
        },
      }}
    >
      <BaseStyles sx={{ color: 'custom' }} />
    </ThemeUIProvider>
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

test('nested ThemeUIProviders combine colors', async () => {
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
    <ThemeUIProvider
      theme={{
        config: { useCustomProperties: true },
        colors: { primary: 'blue' },
      }}
    >
      <ThemeUIProvider
        theme={{
          colors: {
            background: 'white',
            modes: { dark: { background: 'black' } },
          },
        }}
      >
        <DarkModeButton />
      </ThemeUIProvider>
    </ThemeUIProvider>
  )

  let button = await root.findByRole('button')

  expect(button.parentElement).toMatchInlineSnapshot(`
    .emotion-0 {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: white;
    }

    .emotion-0.theme-ui-dark,
    .theme-ui-dark .emotion-0 {
      --theme-ui-colors-background: black;
    }

    .emotion-0.theme-ui-__default,
    .theme-ui-__default .emotion-0 {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: white;
    }

    .emotion-1 {
      color: var(--theme-ui-colors-primary);
      background-color: var(--theme-ui-colors-background);
    }

    <div
      class="emotion-0"
      data-themeui-nested-provider="true"
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
    }

    .emotion-0.theme-ui-dark,
    .theme-ui-dark .emotion-0 {
      --theme-ui-colors-background: black;
    }

    .emotion-0.theme-ui-__default,
    .theme-ui-__default .emotion-0 {
      --theme-ui-colors-primary: blue;
      --theme-ui-colors-background: black;
    }

    .emotion-1 {
      color: var(--theme-ui-colors-primary);
      background-color: var(--theme-ui-colors-background);
    }

    <div
      class="emotion-0"
      data-themeui-nested-provider="true"
    >
      <button
        class="emotion-1"
      >
        Dark Mode
      </button>
    </div>
  `)
})
