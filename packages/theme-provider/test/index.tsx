/**
 * @jest-environment jsdom
 */

import { useThemeUI, __ThemeUIContext } from '@theme-ui/core'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { renderJSON } from '@theme-ui/test-utils'

import { ThemeUIProvider } from '../src'

expect.extend(matchers)

afterEach(cleanup)

test('renders', () => {
  const json = renderJSON(
    <ThemeUIProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeUIProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with theme', () => {
  const json = renderJSON(
    <ThemeUIProvider
      theme={{
        config: {
          useCustomProperties: false,
        },
        colors: {
          primary: 'tomato',
          background: 'white',
          text: 'black',
        },
      }}
    >
      <h1 sx={{ color: 'primary' }}>Hello</h1>
    </ThemeUIProvider>
  )
  expect(json).toHaveStyleRule('color', 'tomato')
})

test('renders global styles', () => {
  const root = render(
    <ThemeUIProvider
      theme={{
        fonts: {
          body: 'Georgia,serif',
        },
        lineHeights: {
          body: 1.5,
        },
        fontWeights: {
          body: 500,
        },
        styles: {
          root: {
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body',
          },
        },
      }}
    >
      <h1>Hello</h1>
    </ThemeUIProvider>
  )

  const style = window.getComputedStyle(root.baseElement.parentElement!)
  expect(style.fontFamily).toBe('Georgia,serif')
  expect(style.fontWeight).toBe('500')
  expect(style.lineHeight).toBe('1.5')
})

test('resets body margin', () => {
  const root = render(
    <ThemeUIProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeUIProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.margin).toBe('0px')
})

test('does not render invalid global styles', () => {
  const root = render(
    <ThemeUIProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeUIProvider>
  )
  const style = window.getComputedStyle(root.baseElement.parentElement!)
  expect(style.fontFamily).toBe('')
  expect(style.fontWeight).toBe('')
  expect(style.lineHeight).toBe('')
})

test('does not render global styles', () => {
  const root = render(
    <ThemeUIProvider
      theme={{
        config: {
          useRootStyles: false,
        },
        fonts: {
          body: 'Georgia,serif',
        },
        lineHeights: {
          body: 1.5,
        },
        fontWeights: {
          body: 500,
        },
        styles: {
          root: {
            fontFamily: 'body',
          },
        },
      }}
    >
      <h1>Hello</h1>
    </ThemeUIProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.fontFamily).toBe('')
  expect(style.fontWeight).toBe('')
  expect(style.lineHeight).toBe('')
})

test('adds box-sizing: border-box', () => {
  const root = render(
    <ThemeUIProvider theme={{}}>
      <h1>Hello</h1>
    </ThemeUIProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.boxSizing).toBe('border-box')
})

test('does not add box-sizing: border-box', () => {
  const styles: HTMLStyleElement[] = [].slice.call(
    document.querySelectorAll('style')
  )
  styles.forEach((style) => (style.innerHTML = ''))
  const root = render(
    <ThemeUIProvider
      theme={{
        config: {
          useBorderBox: false,
        },
      }}
    >
      <h1>Hello</h1>
    </ThemeUIProvider>
  )
  const style = window.getComputedStyle(root.baseElement)
  expect(style.boxSizing).toBe('')
})

test('updates CSS Custom Properties on root element', async () => {
  const DarkModeButton = () => {
    const { colorMode, setColorMode } = useThemeUI()

    if (colorMode === 'dark') return null

    return <button onClick={() => setColorMode!('dark')}>Dark Mode</button>
  }

  const root = render(
    <ThemeUIProvider
      theme={{
        config: {
          // useCustomProperties defaults to `true`
        },
        colors: {
          text: '#000',
          modes: {
            dark: { text: '#fff' },
          },
        },
      }}
    >
      <DarkModeButton />
    </ThemeUIProvider>
  )

  const html = root.baseElement.parentElement!

  expect(
    window.getComputedStyle(html).getPropertyValue('--theme-ui-colors-text')
  ).toBe('#000')

  fireEvent.click(root.getByText('Dark Mode'))

  expect(
    window.getComputedStyle(html).getPropertyValue('--theme-ui-colors-text')
  ).toBe('#fff')
})
