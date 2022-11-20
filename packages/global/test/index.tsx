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

afterEach(cleanup)

test('renders global styles', async () => {
  const root = render(
    <ThemeProvider
      theme={{
        config: {
          useRootStyles: false,
        },
        fonts: {
          body: 'Georgia,serif',
        },
      }}
    >
      <Global
        sx={{
          '@font-face': {
            fontFamily: 'some-name',
          },
          h1: {
            color: 'salmon',
            fontFamily: 'body',
          },
          body: {
            margin: 0,
          },
        }}
      />
      <h1>Hello</h1>
    </ThemeProvider>
  )

  const style = window.getComputedStyle(root.baseElement)
  expect(style.margin).toBe('0px')

  // const h1 = root.baseElement.querySelector('h1')!
  // const style = global.getComputedStyle(h1)
  // console.log(style)
  // expect(style.fontFamily).toBe('Georgia,serif')
  // expect(style.color).toBe('salmon')
})
