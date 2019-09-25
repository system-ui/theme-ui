/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEditor } from './context'
import Combobox from './Combobox'
import Field from './Field'
import { defaultSpace } from './defaults'
//
// import ColorPicker from './ColorPicker'

// todo
// - [ ] typography
// - [ ] color
// - [ ] margin
// - [ ] responsive arrays

export default ({ tag = 'root' }) => {
  const context = useEditor()
  // console.log(context)
  const {
    styles = {},
    colors = {},
    fonts = {},
    fontSizes = [],
    lineHeights = {},
    fontWeights = {},
    space = defaultSpace,
  } = context.theme

  const style = styles[tag] || {}

  const setStyle = next => {
    context.setTheme({
      styles: {
        [tag]: {
          ...style,
          ...next,
        },
      },
    })
  }

  return (
    <div>
      <b>{tag}</b>
      <Combobox
        name={`styles.${tag}.fontFamily`}
        label="Font Family"
        value={style.fontFamily}
        onChange={fontFamily => {
          setStyle({ fontFamily })
        }}
        options={['inherit', ...Object.keys(fonts)]}
      />
      <Combobox
        name={`styles.${tag}.fontSize`}
        label="Font Size"
        value={style.fontSize}
        type={typeof style.fontSize === 'number' ? 'number' : 'text'}
        onChange={fontSize => {
          setStyle({ fontSize })
        }}
        options={Object.keys(fontSizes)}
      />
    </div>
  )
}
