/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEditor } from './context'
import Label from './Label'
import Select from './Select'

export default props => {
  const context = useEditor()
  const {
    theme,
    colorMode,
    setColorMode,
  } = context
  const {
    modes = {}
  } = theme.colors || {}
  const keys = [
    theme.initialColorMode || 'default',
    ...Object.keys(modes)
  ]

  return (
    <div>
      <Label htmlFor='color-mode'>
        Color Mode
      </Label>
      <Select
        id='color-mode'
        name='color-mode'
        value={colorMode}
        onChange={e => {
          const mode = e.target.value
          setColorMode(mode)
        }}>
        {keys.map(key => (
          <option
            key={key}
            children={key}
          />
        ))}
      </Select>
    </div>
  )
}
