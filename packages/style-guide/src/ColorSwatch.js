/** @jsx jsx */
import { jsx, get } from 'theme-ui'
import { toHex, toHSL } from './color'
import { useTheme } from './context'

export const ColorSwatch = ({
  color,
  name,
  size = 128,
  label = true,
  ...props
}) => {
  const { colors } = useTheme()
  const value = get(colors, color)
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
