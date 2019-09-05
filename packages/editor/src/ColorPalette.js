/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'
import { useEditor } from './context'
import ColorPicker from './ColorPicker'

export default props => {
  const context = useEditor()
  const mode = context.colorMode
  const { colors = {} } = context.theme

  const onChange = key => val => {
    let next = {}
    if (mode && colors.modes && colors.modes[mode] && mode !== context.theme.initialColorMode) {
      next = {
        colors: {
          modes: {
            [mode]: {
              [key]: val.hex,
            },
          },
        },
      }
    } else {
      next = {
        colors: {
          [key]: val.hex,
        },
      }
    }
    context.setTheme(next)
  }

  return (
    <ThemeProvider theme={{ colors }}>
      <ColorPalette
        {...props}
        mode={mode}
        render={({ swatch, color, key, ...rest }) => (
          <ColorPicker key={key} color={color} onChange={onChange(key)}>
            {swatch}
          </ColorPicker>
        )}
      />
    </ThemeProvider>
  )
}
