/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEditor } from './context'
import Field from './Field'

export default props => {
  const context = useEditor()
  const { lineHeights = {} } = context.theme

  const onChange = key => val => {
    const n = parseFloat(val)
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
