/**
 * @jest-environment jsdom
 */

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
        styles={{
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

  const bodyStyle = global.getComputedStyle(document.baseElement)
  expect(bodyStyle.fontFamily).toBe('Georgia,serif')
  expect(bodyStyle.margin).toBe('0px')

  const h1 = document.baseElement.querySelector('h1')!
  expect(global.getComputedStyle(h1).color).toBe('salmon')
})

test('renders global and component styles', () => {
  const root = (
    <header>
      <Global
        styles={{
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
