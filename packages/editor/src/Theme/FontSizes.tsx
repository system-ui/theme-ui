/** @jsx jsx */
import * as CSS from 'csstype'
import { jsx, useThemeUI } from 'theme-ui'
import { Fragment } from 'react'
import { Field } from '@theme-ui/components'
import { EditorContextValue } from '../types'

const FontSizes = () => {
  const context = useThemeUI() as EditorContextValue
  const { fontSizes = [] } = context.theme || {}

  const onChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  return (
    <Fragment>
      {Object.keys(fontSizes).map((key) => (
        <div key={key}>
          <Field
            type="number"
            label={key}
            name={'fontSizes.' + key}
            value={
              fontSizes[key as keyof typeof fontSizes] as CSS.Property.FontSize
            }
            onChange={onChange(key)}
          />
        </div>
      ))}
    </Fragment>
  )
}

export default FontSizes
