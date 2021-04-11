/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import * as CSS from 'csstype'
import { Fragment } from 'react'
import { Field } from '@theme-ui/components'
import { EditorContextValue } from '../types'

const LineHeights = () => {
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
      {Object.keys(lineHeights).map((key) => (
        <div key={key}>
          <Field
            type="number"
            label={key}
            name={'lineHeights.' + key}
            value={
              lineHeights[
                key as keyof typeof lineHeights
              ] as CSS.Property.LineHeight
            }
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

export default LineHeights
