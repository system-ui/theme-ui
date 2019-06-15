import React from 'react'
import { useTheme } from './context'
import ColorChip from './ColorChip'

const join = (...args) => args
  .filter(Boolean)
  .join('.')

export const ColorRow = ({
  colors,
  name,
  omit = [],
  ...props
}) => {
  const {
    components: {
      Card,
    }
  } = useTheme()

  return (
    <div>
      {name && <Card>{name}</Card>}
      <div
        style={{
          fontSize: 12,
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        {Object.keys(colors).map(key => {
          const color = colors[key]
          if (!color || omit.includes(key)) return false
          if (typeof color === 'object') {
            return (
              <ColorRow
                {...props}
                key={key}
                name={join(name, key)}
                colors={color}
                omit={omit}
              />
            )
          }
          return (
            <ColorChip
              name={key}
              color={join(name, key)}
              style={{
                margin: 8,
                flexBasis: 128,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export const ColorPalette = ({
  omit = [],
  ...props
}) => {
  const { colors } = useTheme()
  return (
    <div
      style={{
        marginLeft: -8,
        marginRight: -8,
      }}>
      <ColorRow
        omit={omit}
        colors={colors}
      />
    </div>
  )
}

export default ColorPalette
