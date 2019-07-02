/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useTheme } from './context'
import ColorSwatch from './ColorSwatch'

const join = (...args) => args.filter(Boolean).join('.')

export const ColorRow = ({ colors, name, omit = ['modes'], ...props }) => {
  return (
    <div>
      <div
        sx={{
          fontSize: 0,
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        {Object.entries(colors)
          .sort(([_, colorA]) => (typeof colorA === 'string' ? -1 : 1))
          .map(([key, color]) => {
            if (!color || omit.includes(key)) return false
            const id = join(name, key)
            if (typeof color === 'object') {
              return (
                <ColorRow
                  {...props}
                  key={key}
                  name={id}
                  colors={color}
                  omit={omit}
                />
              )
            }
            return (
              <ColorSwatch
                name={id}
                color={id}
                sx={{
                  m: 2,
                  flexBasis: 128,
                }}
              />
            )
          })}
      </div>
    </div>
  )
}

export const ColorPalette = ({ omit = [], ...props }) => {
  const { colors = {} } = useTheme()

  return (
    <div
      style={{
        marginLeft: -8,
        marginRight: -8,
      }}>
      <ColorRow omit={omit} colors={colors} />
    </div>
  )
}

export default ColorPalette
