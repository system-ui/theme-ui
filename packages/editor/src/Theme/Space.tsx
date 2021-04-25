/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Fragment } from 'react'
import { Field } from '@theme-ui/components'
import { EditorContextValue } from '../types'

const defaultSpace = [0, 4, 8, 16, 32, 64, 128, 256, 512]

const Space = () => {
  const context = useThemeUI() as EditorContextValue
  const { space = defaultSpace } = context.theme || {}

  const onChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const n = parseFloat(e.target.value)
    if (Array.isArray(space)) {
      const i = parseInt(key)
      context.setTheme({
        space: [...space.slice(0, i), n, ...space.slice(i + 1)],
      })
    } else {
      context.setTheme({
        space: {
          [key]: n,
        },
      })
    }
  }

  return (
    <Fragment>
      {Object.keys(space).map((key) => (
        <div key={key}>
          <Field
            type="number"
            label={key}
            name={'space.' + key}
            value={space[key as keyof typeof space] as string}
            onChange={onChange(key)}
          />
        </div>
      ))}
    </Fragment>
  )
}

export default Space
