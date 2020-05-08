/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'
import ColorPicker from '../ColorPicker'
import { EditorContext } from '../types'

export default props => {
  // TODO: I need to cast the context value because TypeScript assumes the default theme-ui ContextValue. Is there a better way to make TypeScript know of the EditorContext than casting the type?
  const context = useThemeUI() as EditorContext
  // TODO: Where to add colorMode type?
  const mode = (context as any).colorMode
  const { colors } = context.theme

  const onChange = key => val => {
    let next = {}
    if (
      mode &&
      colors &&
      colors.modes &&
      colors.modes[mode] &&
      // TODO: Where to add initialColorMode type?
      mode !== (context.theme as any).initialColorMode
    ) {
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
        <ColorPicker key={key} color={color} onChange={onChange(key)}>
          {swatch}
        </ColorPicker>
      )}
    />
  )
}
