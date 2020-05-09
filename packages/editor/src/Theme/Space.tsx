/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { Field } from '@theme-ui/components'
import { EditorContext } from '../types'

const defaultSpace = [0, 4, 8, 16, 32, 64, 128, 256, 512]

const Space = () => {
  const context = useThemeUI() as EditorContext
  const { space = defaultSpace } = context.theme

  const onChange = (key: string) => (e: React.FormEvent<HTMLInputElement>) => {
    // TODO: I needed to swap target to currentTarget because TypeScript complains about "Property 'value' does not exist on type 'EventTarget'.ts(2339)". Should I change it back or leave as is?
    const n = parseFloat(e.currentTarget.value)
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

  return Object.keys(space).map(key => (
    <div key={key}>
      <Field
        // FIXME: Field type is comming from external package @types/theme-ui__components, not sure why type prop does not exist in type definition.
        type="number"
        label={key}
        name={'space.' + key}
        value={space[key]}
        onChange={onChange(key)}
      />
    </div>
  ))
}

export default Space
