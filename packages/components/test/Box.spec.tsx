/**
 * @jest-environment jsdom
 */

import { renderJSON, render, waitFor } from '@theme-ui/test-utils'

import { ThemeUIProvider } from '@theme-ui/theme-provider'

import { Box } from '..'

import { theme } from './__test-utils__'
import { __internalProps } from '../src/util'

describe('Box', () => {
  test('renders', () => {
    const json = renderJSON(<Box>Hello</Box>)
    expect(json).toMatchSnapshot()
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
      <ThemeUIProvider theme={theme}>
        <Box variant="boxes.beep" />
      </ThemeUIProvider>
    )
    expect(json).toHaveStyleRule('background-color', 'highlight')
    expect(json).toHaveStyleRule('padding', '32px')
  })

  test('renders with base styles', () => {
    const json = renderJSON(
      <Box
        sx={{ bg: 'cyan', color: 'tomato' }}
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
      <ThemeUIProvider theme={theme}>
        <Box
          // @ts-expect-error
          __themeKey="boxes"
          variant="beep"
        />
      </ThemeUIProvider>
    )
    expect(json).toHaveStyleRule('background-color', 'highlight')
    expect(json).toHaveStyleRule('padding', '32px')
  })
})

test('accepts ref', async () => {
  let ref: HTMLElement | null = null
  render(
    <ThemeUIProvider theme={theme}>
      <Box ref={(r) => (ref = r)} />
    </ThemeUIProvider>
  )
  await waitFor(() => {
    expect(ref).toBeTruthy()
  })
})
