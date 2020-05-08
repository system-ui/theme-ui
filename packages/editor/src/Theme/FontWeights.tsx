/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import * as CSS from 'csstype'
import Combobox from '../Combobox'
import { EditorContext } from '../types'

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const FontWeights = () => {
  const context = useThemeUI() as EditorContext
  const { fontWeights = {} } = context.theme

  const onChange = (key: string) => (val: CSS.FontWeightProperty) => {
    context.setTheme({
      fontWeights: {
        [key]: val,
      },
    })
  }

  return Object.keys(fontWeights).map(key => (
    <div key={key}>
      <Combobox
        label={key}
        name={'fontWeights.' + key}
        value={fontWeights[key]}
        onChange={onChange(key)}
        options={weights}
      />
    </div>
  ))
}

export default FontWeights
