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
