/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Fragment } from 'react'
import { Field } from '@theme-ui/components'
import { EditorContextValue } from '../types'

export default () => {
  const context = useThemeUI() as EditorContextValue
  const { lineHeights = {} } = context.theme || {}

  const onChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const n = parseFloat(e.target.value)
    context.setTheme({
      lineHeights: {
        [key]: n,
      },
    })
  }

  return (
    <Fragment>
      {Object.keys(lineHeights).map(key => (
        <div key={key}>
          <Field<'input'>
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
    </Fragment>
  )
}
