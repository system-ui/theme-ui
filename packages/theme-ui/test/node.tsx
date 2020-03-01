/** @jest-environment node */
/** @jsx jsx */
import { renderToString } from 'react-dom/server'
import { jsx, ThemeProvider, useColorMode } from '../src'

test('does note initializes mode based on localStorage', () => {
  let mode
  const Button = props => {
    const [colorMode, setMode] = useColorMode()
    mode = colorMode
    return <button children="test" />
  }
  expect(() => {
    renderToString(
      <ThemeProvider>
        <Button />
      </ThemeProvider>
    )
  }).not.toThrow()
  expect(mode).toBe('default')
})
