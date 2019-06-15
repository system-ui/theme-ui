import React from 'react'
import get from 'lodash.get'
import { useTheme } from './context'
import { toHex, toHSL } from './color'

export const ColorChip = ({
  color,
  name,
  ...props
}) => {
  const {
    components: {
      Card,
    },
    colors,
  } = useTheme()
  const value = get(colors, color, color)

  return (
    <div {...props}
      title={`${toHex(value)}`}>
      <Card
        style={{
          padding: 64,
          backgroundColor: value,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      />
      <Card
        style={{
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}>
        {name || color}
      </Card>
    </div>
  )
}

export default ColorChip
