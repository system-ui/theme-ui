/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'
import ColorPicker from '../ColorPicker'
import { EditorContext } from '../types'

type ColorsProps = {
  size?: number
}
type ColorPaletteRenderArg = {
  color: string
  swatch: React.ReactNode
  key: string
  name: string
}

const Colors = (props: ColorsProps) => {
  // TODO: I need to cast the context value because TypeScript assumes the default theme-ui ContextValue. Is there a better way to make TypeScript know of the EditorContext than casting the type?
  const context = useThemeUI() as EditorContext
  // FIXME: Where to add colorMode type?
  const mode = context.colorMode
  const { colors } = context.theme

  const onChange = (key: string) => (val: { hex: string }) => {
    let next = {}
    if (
      mode &&
      colors &&
      colors.modes &&
      colors.modes[mode] &&
      // FIXME: Where to add initialColorMode type?
      mode !== context.theme.initialColorMode
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
      render={({ swatch, color, key, ...rest }: ColorPaletteRenderArg) => (
        <ColorPicker key={key} color={color} onChange={onChange(key)}>
          {swatch}
        </ColorPicker>
      )}
    />
  )
}

export default Colors
