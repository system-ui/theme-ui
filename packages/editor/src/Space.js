/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEditor } from './context'
import Field from './Field'

const defaultSpace = [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ]

export default props => {
  const context = useEditor()
  const { space = defaultSpace } = context.theme

  const onChange = key => val => {
    const n = parseFloat(val)
    if (Array.isArray(space)) {
      const i = parseInt(key)
      context.setTheme({
        space: [
          ...space.slice(0, i),
          n,
          ...space.slice(i + 1)
        ]
      })
    } else {
      context.setTheme({
        space: {
          [key]: n
        }
      })
    }
  }

  return Object.keys(space).map(key => (
    <div key={key}>
      <Field
        type='number'
        label={key}
        name={'space.' + key}
        value={space[key]}
        onChange={onChange(key)}
      />
    </div>
  ))
}
