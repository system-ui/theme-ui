/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Field } from '@theme-ui/components'

export default props => {
  const context = useThemeUI()
  const { fontSizes = [] } = context.theme

  const onChange = key => e => {
    const n = parseFloat(e.target.value)
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
