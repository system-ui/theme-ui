/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import Field from './Field'

export default props => {
  const context = useThemeUI()
  const { lineHeights = {} } = context.theme

  const onChange = key => val => {
    const n = parseFloat(val)
    context.setTheme({
      lineHeights: {
        [key]: n,
      },
    })
  }

  return (
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        mx: -1,
      }}>
      {Object.keys(lineHeights).map(key => (
        <div
          key={key}
          sx={{
            flex: '1 1 96px',
            px: 1,
          }}>
          <Field
            type="number"
            label={key}
            name={'lineHeights.' + key}
            value={lineHeights[key]}
            onChange={onChange(key)}
            min={1}
            max={3}
            step={1 / 64}
          />
        </div>
      ))}
    </div>
  )
}
