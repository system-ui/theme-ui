/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEditor } from './context'
import Field from './Field'

export default props => {
  const context = useEditor()
  const { fontSizes = [] } = context.theme

  const onChange = key => val => {
    const n = parseFloat(val)
    if (Array.isArray(fontSizes)) {
      const i = parseInt(key)
      context.setTheme({
        fontSizes: [...fontSizes.slice(0, i), n, ...fontSizes.slice(i + 1)],
      })
    } else {
      context.setTheme({
        fontSizes: {
          [key]: n,
        },
      })
    }
  }

  return Object.keys(fontSizes).map(key => (
    <div key={key}>
      <Field
        type="number"
        label={key}
        name={'fontSizes.' + key}
        value={fontSizes[key]}
        onChange={onChange(key)}
      />
    </div>
  ))
}
