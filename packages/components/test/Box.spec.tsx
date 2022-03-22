/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderJSON, render, waitFor } from '@theme-ui/test-utils'

import { ThemeProvider } from 'theme-ui'

import { Box } from '..'

import { theme } from './__test-utils__'
import { __internalProps } from '../src/util'

describe('Box', () => {
  test('renders', () => {
    const json = renderJSON(<Box p={2}>Hello</Box>)
    expect(json).toMatchSnapshot()
  })

  test('renders with padding props', () => {
    const json = renderJSON(<Box px={2} py={4} />)
    expect(json).toHaveStyleRule('padding-left', '8px')
    expect(json).toHaveStyleRule('padding-right', '8px')
    expect(json).toHaveStyleRule('padding-top', '32px')
    expect(json).toHaveStyleRule('padding-bottom', '32px')
  })

  test('renders with margin props', () => {
    const json = renderJSON(<Box m={3} mb={4} />)
    expect(json).toHaveStyleRule('margin', '16px')
    expect(json).toHaveStyleRule('margin-bottom', '32px')
  })

  test('renders with color props', () => {
    const json = renderJSON(<Box color="tomato" bg="black" />)
    expect(json).toHaveStyleRule('color', 'tomato')
    expect(json).toHaveStyleRule('background-color', 'black')
  })

  test('renders with sx prop', () => {
    const json = renderJSON(
      <Box
        sx={{
          bg: 'tomato',
          borderRadius: 4,
        }}
      />
    )
    expect(json).toHaveStyleRule('background-color', 'tomato')
    expect(json).toHaveStyleRule('border-radius', '4px')
  })

  test('renders with variant prop', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box variant="boxes.beep" />
      </ThemeProvider>
    )
    expect(json).toHaveStyleRule('background-color', 'highlight')
    expect(json).toHaveStyleRule('padding', '32px')
  })

  test('renders with base styles', () => {
    const json = renderJSON(
      <Box
        bg="cyan"
        sx={{ color: 'tomato' }}
        {...__internalProps({
          __css: {
            p: 4,
            color: 'black',
            bg: 'white',
          },
        })}
      />
    )
    expect(json).toHaveStyleRule('padding', '32px')
    expect(json).toHaveStyleRule('color', 'tomato')
    expect(json).toHaveStyleRule('background-color', 'cyan')
  })

  test('renders with __themeKey variant', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box
          // @ts-expect-error
          __themeKey="boxes"
          variant="beep"
        />
      </ThemeProvider>
    )
    expect(json).toHaveStyleRule('background-color', 'highlight')
    expect(json).toHaveStyleRule('padding', '32px')
  })
})

test('accepts ref', async () => {
  let ref: HTMLElement | null = null
  render(
    <ThemeProvider theme={theme}>
      <Box ref={(r) => (ref = r)} />
    </ThemeProvider>
  )
  await waitFor(() => {
    expect(ref).toBeTruthy()
  })
})
