/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Field } from '@theme-ui/components'

export default props => {
  const context = useThemeUI()
  const { lineHeights = {} } = context.theme

  const onChange = key => e => {
    const n = parseFloat(e.target.value)
    context.setTheme({
      lineHeights: {
        [key]: n,
      },
    })
  }

  return Object.keys(lineHeights).map(key => (
    <div key={key}>
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
  ))
}
