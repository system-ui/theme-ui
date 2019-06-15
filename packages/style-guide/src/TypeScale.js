import React from 'react'
import { useTheme } from './context'
import TypeSpecimen from './TypeSpecimen'

export const TypeScale = ({
  reverse = true,
  style,
  ...props
}) => {
  const { fontSizes } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        ...style,
      }}>
      {fontSizes.map((n, i) => (
        <TypeSpecimen
          {...props}
          key={i}
          fontSize={reverse ? (fontSizes.length - 1 - i) : i}
        />
      ))}
    </div>
  )
}

export default TypeScale
