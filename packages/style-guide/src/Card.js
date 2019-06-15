import React from 'react'
import get from 'lodash.get'
import { useTheme } from './context'

export const Card = ({
  color = 'text',
  bg = 'background',
  padding = 3,
  style,
  ...props,
}) => {
  const { space, colors, styles, } = useTheme()

  return (
    <div
      {...props}
      style={{
        padding: get(space, padding, padding),
        color: get(colors, color, color),
        backgroundColor: get(colors, bg, bg),
        borderRadius: 4,
        ...get(styles, 'Card', {}),
        ...style,
      }}
    />
  )
}

export default Card
