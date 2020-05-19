/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'
import ColorPicker from '../ColorPicker'
import { EditorContextValue } from '../types'

export interface ColorsProps {
  size?: number
}
type ColorPaletteRenderArg = {
  color: string
  swatch: React.ReactNode
  key: string
  name: string
}

const Colors = (props: ColorsProps) => {
  const context = useThemeUI() as EditorContextValue
  // TODO: Remove any after @theme-ui/color-mode was transformed to TypeScript
  const mode = (context as any).colorMode
  const { colors } = context.theme || {}

  const onChange = (key: string) => (val: { hex: string }) => {
    let next = {}
    if (
      mode &&
      colors &&
      colors.modes &&
      colors.modes[mode] &&
      // TODO: Remove any after @theme-ui/color-mode was transformed to TypeScript
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
      render={({ swatch, color, key, ...rest }: ColorPaletteRenderArg) => (
        <ColorPicker key={key} color={color} onChange={onChange(key)}>
          {swatch}
        </ColorPicker>
      )}
    />
  )
}

export default Colors
