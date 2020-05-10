/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Field } from '@theme-ui/components'
import { EditorContextValue } from '../types'

const FontSizes = () => {
  const context = useThemeUI() as EditorContextValue
  const { fontSizes = [] } = context.theme

  const onChange = (key: string) => (e: React.FormEvent<HTMLInputElement>) => {
    // TODO: I needed to swap target to currentTarget because TypeScript complains about "Property 'value' does not exist on type 'EventTarget'.ts(2339)". Should I change it back or leave as is?
    const n = parseFloat(e.currentTarget.value)
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
        // FIXME: Field type is comming from external package @types/theme-ui__components, not sure why type prop does not exist in type definition.
        type="number"
        label={key}
        name={'fontSizes.' + key}
        value={fontSizes[key]}
        onChange={onChange(key)}
      />
    </div>
  ))
}

export default FontSizes
