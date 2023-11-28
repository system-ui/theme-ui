import { useTheme } from './context'
import TypeStyle from './TypeStyle'

const getValue = (fontSize: string | number | (string & {})) =>
  typeof fontSize === 'number' ? `${fontSize}px` : fontSize

export interface TypeScaleProps {
  reverse?: boolean
}
export const TypeScale = ({ reverse = true, ...props }) => {
  const theme = useTheme() || {}
  const fontSizeEntries = reverse
    ? Object.entries(theme.fontSizes || []).reverse()
    : Object.entries(theme.fontSizes || [])

  return (
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
      }}
    >
      {fontSizeEntries.map(([key, val]) => {
        if (!val || typeof val === 'object') {
          // TODO: `theme.fontSizes` can be a deeply nested object.
          // We should either update the types or recursively render here.
          return null
        }

        return (
          <TypeStyle
            key={key}
            fontSize={key}
            sx={{
              mr: 3,
            }}
            children={getValue(val)}
            {...props}
          />
        )
      })}
    </div>
  )
}

export default TypeScale
