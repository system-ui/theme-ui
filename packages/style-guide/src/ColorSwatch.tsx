/** @jsx jsx */
import { ComponentProps } from 'react'
import { jsx, get, ResponsiveStyleValue } from 'theme-ui'
import { toHex } from './color'
import { useTheme } from './context'

export interface ColorSwatchProps extends ComponentProps<'div'> {
  color: string
  name?: React.ReactNode
  size?: ResponsiveStyleValue<string | number>
  label?: boolean
}
export const ColorSwatch = ({
  color,
  name,
  size = 128,
  label = true,
  ...props
}: ColorSwatchProps) => {
  const { colors } = useTheme()!
  const value = get(colors!, color)
  return (
    <div {...props} title={`${toHex(value)}`}>
      <div
        sx={{
          width: size,
          height: size,
          bg: color,
        }}
      />
      {label && (
        <div
          sx={{
            py: 2,
          }}>
          {name || color}
        </div>
      )}
    </div>
  )
}

export default ColorSwatch
