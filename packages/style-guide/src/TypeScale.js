/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useTheme } from './context'
import TypeStyle from './TypeStyle'

const getValue = (fontSizes, key) => {
  const raw = fontSizes[key]
  if (typeof raw !== 'number') return raw
  return raw + 'px'
}

export const TypeScale = ({ reverse = true, ...props }) => {
  const { fontSizes = [] } = useTheme()

  return (
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
      }}
    >
      {fontSizes.map((n, i) => {
        const key = reverse ? fontSizes.length - 1 - i : i
        return (
          <TypeStyle
            key={i}
            fontSize={key}
            sx={{
              mr: 3,
            }}
            children={getValue(fontSizes, key)}
            {...props}
          />
        )
      })}
    </div>
  )
}

export default TypeScale
