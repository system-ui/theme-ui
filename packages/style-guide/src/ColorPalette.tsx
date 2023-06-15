import { useTheme } from './context'
import ColorSwatch, { ColorSwatchProps } from './ColorSwatch'

const join = (...args: unknown[]) => args.filter(Boolean).join('.')

type Colors = Record<string, string | { [key: string]: Colors }>
export interface ColorRowProps extends Omit<ColorSwatchProps, 'color'> {
  colors: Colors
  name?: string
  omit?: string[]
  render?: (value: {
    swatch: React.ReactElement
    color: string
    key: string
    name: string
  }) => React.ReactNode
  size?: number | string
}
export const ColorRow = ({
  colors,
  name,
  omit = ['modes'],
  render,
  size,
  ...props
}: ColorRowProps) => {
  return (
    <div>
      <div
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Object.keys(colors).map((key) => {
          const color = colors[key]
          if (!color || omit.includes(key)) return false
          const id = join(name, key)
          if (typeof color === 'object') {
            return (
              <ColorRow
                {...props}
                key={key}
                name={id}
                colors={color as Colors}
                size={size}
                omit={omit}
              />
            )
          }
          const swatch = (
            <ColorSwatch
              {...props}
              key={key}
              name={id}
              color={id}
              size={size}
              sx={{
                m: 2,
              }}
            />
          )
          if (typeof render === 'function') {
            return render({
              swatch,
              color,
              key,
              name: id,
            })
          }
          return swatch
        })}
      </div>
    </div>
  )
}

export interface ColorPaletteProps extends Omit<ColorRowProps, 'colors'> {
  omit?: string[]
  mode?: string
}
export const ColorPalette = ({ omit, mode, ...props }: ColorPaletteProps) => {
  const theme = useTheme()
  let colors = theme!.colors

  if (mode && colors!.modes) {
    colors = colors!.modes[mode] || colors
  }

  return (
    <div
      style={{
        marginLeft: -8,
        marginRight: -8,
      }}
    >
      <ColorRow {...props} omit={omit} colors={colors as Colors} />
    </div>
  )
}

export default ColorPalette
