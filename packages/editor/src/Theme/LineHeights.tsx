/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Field } from '@theme-ui/components'
import { EditorContext } from '../types'

export default () => {
  const context = useThemeUI() as EditorContext
  const { lineHeights = {} } = context.theme

  const onChange = (key: string) => (e: React.FormEvent<HTMLInputElement>) => {
    // TODO: I needed to swap target to currentTarget because TypeScript complains about "Property 'value' does not exist on type 'EventTarget'.ts(2339)". Should I change it back or leave as is?
    const n = parseFloat(e.currentTarget.value)
    context.setTheme({
      lineHeights: {
        [key]: n,
      },
    })
  }

  return Object.keys(lineHeights).map(key => (
    <div key={key}>
      <Field
        // FIXME: Field type is comming from external package @types/theme-ui__components, not sure why type prop does not exist in type definition.
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
  ))
}
