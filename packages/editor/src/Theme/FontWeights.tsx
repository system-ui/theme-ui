/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Fragment } from 'react'
import * as CSS from 'csstype'
import Combobox from '../Combobox'
import { EditorContextValue } from '../types'

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const FontWeights = () => {
  const context = useThemeUI() as EditorContextValue
  const { fontWeights = {} } = context.theme

  const onChange = (key: string) => (val: string | number) => {
    context.setTheme({
      fontWeights: {
        [key]: val as CSS.FontWeightProperty,
      },
    })
  }

  return (
    <Fragment>
      {Object.keys(fontWeights).map(key => (
        <div key={key}>
          <Combobox
            label={key}
            name={'fontWeights.' + key}
            value={fontWeights[key]}
            onChange={onChange(key)}
            options={weights}
          />
        </div>
      ))}
    </Fragment>
  )
}

export default FontWeights
