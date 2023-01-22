/**
 * @jest-environment jsdom
 * @jsx jsx
 */

import { jsx } from '@theme-ui/core'
import { cleanup } from '@testing-library/react'
import { render } from '@theme-ui/test-utils'
import { matchers } from '@emotion/jest'

import { ThemeProvider } from '@theme-ui/core'
import Global from '../src'

expect.extend(matchers)

beforeEach(() => {
  document.head.innerHTML = ''
  jest.resetAllMocks()
})

afterEach(cleanup)

test.only('renders global styles', async () => {
  const root = (
    <ThemeProvider
      theme={{
        config: {
          useRootStyles: false,
        },
        fonts: {
          body: 'Georgia,serif',
        },
        colors: {
          primary: 'salmon',
        },
      }}
    >
      <Global
        sx={{
          '@font-face': {
            fontFamily: 'some-name',
          },
          body: {
            fontFamily: 'body',
            margin: 0,
          },
          h1: {
            color: 'primary',
          },
        }}
      />
      <h1>Hello</h1>
    </ThemeProvider>
  )

  const document = render(root)
  expect(document.baseElement.parentElement).toMatchSnapshot()

  const style = window.getComputedStyle(document.baseElement.parentElement!)
  expect(style.fontFamily).toBe('Georgia,serif')
  expect(style.margin).toBe('0px')

  const h1 = document.baseElement.querySelector('h1')!
  const h1Style = global.getComputedStyle(h1)
  expect(h1Style.fontFamily).toBe('Georgia,serif')
  expect(h1Style.color).toBe('salmon')
})

test('renders global and component styles', () => {
  const root = (
    <header>
      <Global
        sx={{
          html: {
            backgroundColor: 'hotpink',
          },
        }}
      />
      <div sx={{ color: 'pink' }} />
    </header>
  )
  const { baseElement } = render(root)
  expect(baseElement.parentElement).toMatchSnapshot()
})
