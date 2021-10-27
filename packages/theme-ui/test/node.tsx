/** @jest-environment node */
/** @jsx jsx */
import { renderToString } from 'react-dom/server'
import { jsx, ThemeProvider, useColorMode } from '../src'

test('does not initialize mode based on localStorage', () => {
  let mode
  const Button = () => {
    const [colorMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }

  expect(() => {
    renderToString(
      <ThemeProvider theme={{}}>
        <Button />
      </ThemeProvider>
    )
  }).not.toThrow()

  // server doesn't know user's color mode, so the value is `undefined`
  expect(mode).toBe(undefined)
})
