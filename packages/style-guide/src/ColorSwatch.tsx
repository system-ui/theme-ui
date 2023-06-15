import { getColor } from '@theme-ui/color'
import { ComponentProps } from 'react'
import { ResponsiveStyleValue } from 'theme-ui'
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
  const theme = useTheme()!
  const value = getColor(theme, color)
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
          }}
        >
          {name || color}
        </div>
      )}
    </div>
  )
}

export default ColorSwatch
