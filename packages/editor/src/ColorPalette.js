/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'
import ColorPicker from './ColorPicker'

export default props => {
  const context = useThemeUI()
  const mode = context.colorMode

  const onChange = key => val => {
    let next = {}
    if (mode && mode !== context.theme.initialColorMode) {
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
    <ColorPalette
      {...props}
      mode={mode}
      render={({ swatch, color, key, ...rest }) => (
        <ColorPicker color={color} onChange={onChange(key)}>
          {swatch}
        </ColorPicker>
      )}
    />
  )
}
