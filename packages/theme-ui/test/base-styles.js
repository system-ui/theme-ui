import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import { BaseStyles } from '../src/base-styles'
import { ThemeProvider } from '../src/provider'

expect.extend(matchers)

const theme = {
  fonts: {
    body: 'system-ui',
  },
  fontWeights: {
    body: 400,
  },
  lineHeights: {
    body: 1.5,
  },
  styles: {
    h1: {
      fontWeight: 900,
      color: 'tomato',
    },
  }
}

test.skip('renders styles with child selectors', () => {
  const json = renderer.create(
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <h1>Hello</h1>
      </BaseStyles>
    </ThemeProvider>
  ).toJSON()
  expect(json).toHaveStyleRule('font-family', 'system-ui')
  expect(json).toHaveStyleRule('font-weight', '400')
  expect(json).toHaveStyleRule('line-height', '1.5')
  expect(json).toHaveStyleRule('color', 'tomato', { target: 'h1' })
  expect(json).toHaveStyleRule('font-weight', '900', { target: 'h1' })
})
